/**
 * Gerenciador Multiplayer em Tempo Real P2P (WebRTC via PeerJS)
 * Permite que jogadores em celulares ou computadores diferentes joguem na mesma sala
 * diretamente pelo GitHub Pages, sem necessidade de servidor pago!
 */
class MultiplayerManager {
  constructor() {
    this.peer = null;
    this.connections = {}; // Conexões ativas (quando é Host)
    this.hostConnection = null; // Conexão com o Host (quando é Convidado)
    this.isHost = true;
    this.isConnectedOnline = false;
    this.roomCode = "BR" + Math.floor(10 + Math.random() * 90);
    this.gameMode = "FFA_4P";
    this.selectedGenre = "Todos os Gêneros";
    this.players = [];
    this.bossState = {
      name: "Mestre do Vinil",
      totalHp: 15000,
      currentHp: 15000
    };
    this.callbacks = {};
  }

  on(event, callback) {
    this.callbacks[event] = callback;
  }

  emit(event, data) {
    if (this.callbacks[event]) {
      this.callbacks[event](data);
    }
  }

  /**
   * Inicializa o nó P2P do PeerJS
   */
  initPeer(onReady) {
    if (this.peer && !this.peer.destroyed) {
      if (onReady) onReady();
      return;
    }

    if (typeof Peer === "undefined") {
      console.warn("PeerJS não carregado. Operando em modo local.");
      if (onReady) onReady();
      return;
    }

    try {
      this.peer = new Peer({
        debug: 1,
        config: {
          iceServers: [
            { urls: "stun:stun.l.google.com:19302" },
            { urls: "stun:global.stun.twilio.com:3478" }
          ]
        }
      });

      this.peer.on("open", (id) => {
        this.isConnectedOnline = true;
        if (onReady) onReady();
      });

      this.peer.on("error", (err) => {
        console.warn("PeerJS aviso:", err.type);
      });
    } catch (e) {
      console.warn("Erro ao iniciar PeerJS:", e);
      if (onReady) onReady();
    }
  }

  /**
   * Cria uma sala como Anfitrião (Host)
   */
  createRoom(mode, userProfile, genre = "Todos os Gêneros", challengeType = "ALL") {
    this.isHost = true;
    this.gameMode = mode;
    this.selectedGenre = genre;
    this.selectedChallengeType = challengeType;
    this.roomCode = "BR" + Math.floor(10 + Math.random() * 90);
    this.connections = {};

    this.players = [
      {
        id: "p_host",
        name: userProfile.username || "Jogador",
        avatar: userProfile.avatar || "🎸",
        team: "A",
        score: 0,
        streak: 0,
        hasAnswered: false,
        isFrozen: false,
        isHost: true,
        isBot: false
      }
    ];

    if (mode === "COOP_BOSS") {
      this.bossState.currentHp = this.bossState.totalHp;
    }

    // Inicia listener de conexões no Host
    const peerId = `soundquiz-${this.roomCode.toLowerCase()}`;
    if (typeof Peer !== "undefined") {
      if (this.peer) this.peer.destroy();

      this.peer = new Peer(peerId, {
        config: {
          iceServers: [
            { urls: "stun:stun.l.google.com:19302" }
          ]
        }
      });

      this.peer.on("connection", (conn) => {
        this.handleGuestConnection(conn);
      });

      this.peer.on("error", (err) => {
        // Se o ID já existir, tenta outro código
        if (err.type === "unavailable-id") {
          this.roomCode = "BR" + Math.floor(10 + Math.random() * 90);
          this.createRoom(mode, userProfile, genre);
        }
      });
    }

    return {
      roomCode: this.roomCode,
      players: this.players,
      bossState: this.bossState
    };
  }

  /**
   * Conecta a uma sala existente como Convidado
   */
  joinRoom(code, userProfile, onJoined, onError) {
    this.isHost = false;
    this.roomCode = code.toUpperCase();
    const hostPeerId = `soundquiz-${this.roomCode.toLowerCase()}`;

    this.initPeer(() => {
      try {
        const conn = this.peer.connect(hostPeerId, { reliable: true });
        this.hostConnection = conn;

        conn.on("open", () => {
          // Envia dados do jogador para o Host
          conn.send({
            type: "GUEST_JOIN",
            userProfile
          });
        });

        conn.on("data", (data) => {
          this.handleHostMessage(data);
        });

        conn.on("close", () => {
          alert("A conexão com o anfitrião da sala foi encerrada.");
        });

        conn.on("error", (err) => {
          if (onError) onError("Não foi possível conectar à sala " + this.roomCode);
        });

        if (onJoined) onJoined();
      } catch (e) {
        if (onError) onError("Erro ao conectar à sala.");
      }
    });
  }

  /**
   * Host lida com a entrada de um convidado
   */
  handleGuestConnection(conn) {
    conn.on("data", (data) => {
      if (data.type === "GUEST_JOIN") {
        const currentCount = this.players.filter(p => !p.isBot).length;
        const maxCapacity = (this.gameMode === "DUEL_1V1") ? 2 : 4;

        if (currentCount >= maxCapacity) {
          conn.send({ type: "ERROR", message: "A sala já está cheia!" });
          conn.close();
          return;
        }

        const team = (this.gameMode === "DUO_2V2" && currentCount % 2 !== 0) ? "B" : "A";

        const newPlayer = {
          id: conn.peer,
          name: data.userProfile.username || `Jogador ${currentCount + 1}`,
          avatar: data.userProfile.avatar || "🎧",
          team: team,
          score: 0,
          streak: 0,
          hasAnswered: false,
          isFrozen: false,
          isHost: false,
          isBot: false
        };

        this.players.push(newPlayer);
        this.connections[conn.peer] = conn;

        // Notifica todos os jogadores da nova lista
        this.broadcast({
          type: "ROOM_UPDATE",
          players: this.players,
          mode: this.gameMode,
          genre: this.selectedGenre,
          roomCode: this.roomCode
        });

        this.emit("room_update", { players: this.players });
      }

      if (data.type === "SUBMIT_ANSWER") {
        const p = this.players.find(x => x.id === conn.peer);
        if (p) {
          p.hasAnswered = true;
          if (data.isCorrect) {
            p.streak++;
            p.score += data.points;
            if (this.gameMode === "COOP_BOSS") {
              this.damageBoss(Math.floor(data.points * 1.2));
            }
          } else {
            p.streak = 0;
          }
          this.broadcast({
            type: "PLAYER_ANSWERED",
            playerId: p.id,
            score: p.score,
            isCorrect: data.isCorrect,
            bossState: this.bossState
          });
          this.emit("player_answered", { player: p });
        }
      }

      if (data.type === "CHAT_REACTION") {
        this.broadcast({
          type: "CHAT_REACTION",
          playerName: data.playerName,
          avatar: data.avatar,
          emoji: data.emoji
        });
        this.emit("chat_reaction", data);
      }
    });

    conn.on("close", () => {
      this.players = this.players.filter(p => p.id !== conn.peer);
      delete this.connections[conn.peer];
      this.broadcast({
        type: "ROOM_UPDATE",
        players: this.players,
        mode: this.gameMode,
        genre: this.selectedGenre
      });
      this.emit("room_update", { players: this.players });
    });
  }

  /**
   * Convidado processa as mensagens recebidas do Host
   */
  handleHostMessage(data) {
    if (data.type === "ROOM_UPDATE") {
      this.players = data.players;
      this.gameMode = data.mode;
      this.roomCode = data.roomCode;
      this.emit("room_update", { players: this.players });
    }

    if (data.type === "START_GAME") {
      this.players = data.players;
      this.selectedChallengeType = data.challengeType || "ALL";
      this.gameMode = data.mode || this.gameMode;
      this.selectedGenre = data.genre || this.selectedGenre;
      this.emit("game_started_by_host", {
        rounds: data.rounds,
        players: data.players,
        challengeType: data.challengeType
      });
    }

    if (data.type === "PLAYER_ANSWERED") {
      const p = this.players.find(x => x.id === data.playerId);
      if (p) {
        p.hasAnswered = true;
        p.score = data.score;
      }
      if (data.bossState) this.bossState = data.bossState;
      this.emit("player_answered", { player: p });
    }

    if (data.type === "CHAT_REACTION") {
      this.emit("chat_reaction", data);
    }

    if (data.type === "BOSS_UPDATED") {
      this.bossState = data.bossState;
      this.emit("boss_updated", this.bossState);
    }
  }

  /**
   * Host envia mensagem para todos os convidados conectados
   */
  broadcast(data) {
    Object.values(this.connections).forEach(conn => {
      if (conn && conn.open) {
        conn.send(data);
      }
    });
  }

  /**
   * Inicia a partida e sincroniza as rodadas com todos os jogadores
   */
  startMatchWithPlayers(rounds) {
    // Se faltarem jogadores para completar 4 no modo FFA ou Duplas, completa com Bots
    const humanCount = this.players.length;
    const botPool = [
      { name: "Mariana_Rock", avatar: "⚡", team: this.gameMode === "DUO_2V2" ? "A" : "B" },
      { name: "Lucas_Sertanejo", avatar: "🤠", team: "B" },
      { name: "DJ_Beat", avatar: "🎧", team: "B" }
    ];

    let neededBots = 0;
    if (this.gameMode === "FFA_4P" || this.gameMode === "COOP_BOSS" || this.gameMode === "DUO_2V2") {
      neededBots = Math.max(0, 4 - humanCount);
    } else if (this.gameMode === "DUEL_1V1") {
      neededBots = Math.max(0, 2 - humanCount);
    }

    for (let i = 0; i < neededBots; i++) {
      this.players.push({
        id: `bot_${i}`,
        name: botPool[i].name,
        avatar: botPool[i].avatar,
        team: botPool[i].team,
        score: 0,
        streak: 0,
        hasAnswered: false,
        isFrozen: false,
        isHost: false,
        isBot: true
      });
    }

    // Se for o Host, envia o comando de início sincronizado para todos
    if (this.isHost) {
      this.broadcast({
        type: "START_GAME",
        rounds: rounds,
        players: this.players,
        challengeType: this.selectedChallengeType,
        mode: this.gameMode,
        genre: this.selectedGenre
      });
    }
  }

  /**
   * Simula a resposta dos Bots quando presentes
   */
  startBotSimulation(currentChallenge, onBotAnsweredCallback) {
    if (!this.isHost) return; // Apenas o Host calcula as respostas dos Bots

    this.players.forEach(p => {
      p.hasAnswered = false;
      p.isFrozen = false;
    });

    this.players.filter(p => p.isBot).forEach(bot => {
      const delayMs = 1500 + Math.random() * 5500;
      const willGetRight = Math.random() < 0.75;

      setTimeout(() => {
        if (bot.hasAnswered || bot.isFrozen) return;

        bot.hasAnswered = true;
        let points = 0;
        if (willGetRight) {
          bot.streak++;
          points = gameEngine.calculateScore({
            isCorrect: true,
            responseTimeMs: delayMs,
            arrivalRank: 2,
            currentStreak: bot.streak,
            isBonusRound: currentChallenge.isBonusRound
          });
        } else {
          bot.streak = 0;
        }

        bot.score += points;

        if (this.gameMode === "COOP_BOSS" && willGetRight) {
          this.damageBoss(Math.floor(points * 1.2));
        }

        this.broadcast({
          type: "PLAYER_ANSWERED",
          playerId: bot.id,
          score: bot.score,
          isCorrect: willGetRight,
          bossState: this.bossState
        });

        if (onBotAnsweredCallback) {
          onBotAnsweredCallback({
            player: bot,
            isCorrect: willGetRight,
            points: points
          });
        }
      }, delayMs);
    });
  }

  damageBoss(damage) {
    this.bossState.currentHp = Math.max(0, this.bossState.currentHp - damage);
    this.broadcast({
      type: "BOSS_UPDATED",
      bossState: this.bossState
    });
    this.emit("boss_updated", this.bossState);
  }

  sendReaction(emoji, userProfile) {
    const data = {
      type: "CHAT_REACTION",
      playerName: userProfile.username,
      avatar: userProfile.avatar,
      emoji: emoji
    };

    if (this.isHost) {
      this.broadcast(data);
      this.emit("chat_reaction", data);
    } else if (this.hostConnection && this.hostConnection.open) {
      this.hostConnection.send(data);
    }
  }

  submitUserAnswer(isCorrect, points) {
    if (!this.isHost && this.hostConnection && this.hostConnection.open) {
      this.hostConnection.send({
        type: "SUBMIT_ANSWER",
        isCorrect,
        points
      });
    }
  }

  getShareableLink() {
    return `${window.location.origin}${window.location.pathname}?sala=${this.roomCode}`;
  }

  getWhatsAppShareUrl() {
    const text = encodeURIComponent(
      `🎶 Bora jogar SoundQuiz comigo agora? Minha sala é: ${this.roomCode}!\nEntre pelo link: ${this.getShareableLink()}`
    );
    return `https://api.whatsapp.com/send?text=${text}`;
  }
}

// Instância global
const multiplayerManager = new MultiplayerManager();
