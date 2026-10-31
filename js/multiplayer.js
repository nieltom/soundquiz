/**
 * Gerenciador de Multiplayer em Tempo Real
 * Suporta tanto WebSockets reais (Socket.io) quanto Simulação Autônoma (Bots Inteligentes)
 * para que o jogo funcione instantaneamente direto no navegador sem exigir servidor prévio!
 */
class MultiplayerManager {
  constructor() {
    this.socket = null;
    this.isOnline = false;
    this.roomCode = "BR" + Math.floor(10 + Math.random() * 90);
    this.gameMode = "FFA_4P"; // "FFA_4P", "DUEL_1V1", "DUO_2V2", "COOP_BOSS"
    this.players = [];
    this.bossState = {
      name: "Mestre do Vinil",
      totalHp: 15000,
      currentHp: 15000,
      attackPower: 1200
    };
    this.botTimer = null;
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
   * Conecta ao servidor Socket.io caso exista na mesma origem ou porta especificada
   */
  connectToServer(serverUrl = "") {
    if (typeof io !== "undefined") {
      try {
        this.socket = io(serverUrl || window.location.origin, {
          transports: ["websocket", "polling"],
          timeout: 4000
        });

        this.socket.on("connect", () => {
          this.isOnline = true;
          this.emit("connection_status", { online: true });
        });

        this.socket.on("room_update", (data) => this.emit("room_update", data));
        this.socket.on("round_start", (data) => this.emit("round_start", data));
        this.socket.on("player_answered", (data) => this.emit("player_answered", data));
        this.socket.on("round_result", (data) => this.emit("round_result", data));
        this.socket.on("chat_reaction", (data) => this.emit("chat_reaction", data));
        return;
      } catch (e) {
        console.log("Servidor Socket.IO não detectado. Iniciando em Modo Local/Bots...");
      }
    }
    // Fallback: Modo Local / Simulador
    this.isOnline = false;
  }

  /**
   * Inicializa uma sala com jogadores humanos e bots dinâmicos
   */
  createRoom(mode, userProfile) {
    this.gameMode = mode;
    this.roomCode = "BR" + Math.floor(10 + Math.random() * 90);

    // Jogador Principal
    this.players = [
      {
        id: "p_user",
        name: userProfile.username || "Você",
        avatar: userProfile.avatar || "🎸",
        team: "A",
        score: 0,
        hasAnswered: false,
        isFrozen: false,
        isHost: true,
        isBot: false,
        streak: 0
      }
    ];

    // Popula com oponentes de acordo com o modo
    const botPool = [
      { name: "Mariana_Rock", avatar: "⚡", team: mode === "DUO_2V2" ? "A" : "B" },
      { name: "Lucas_Sertanejo", avatar: "🤠", team: "B" },
      { name: "DJ_Beat", avatar: "🎧", team: "B" }
    ];

    let botsToAdd = 3;
    if (mode === "DUEL_1V1") botsToAdd = 1;

    for (let i = 0; i < botsToAdd; i++) {
      this.players.push({
        id: `bot_${i}`,
        name: botPool[i].name,
        avatar: botPool[i].avatar,
        team: botPool[i].team,
        score: 0,
        hasAnswered: false,
        isFrozen: false,
        isHost: false,
        isBot: true,
        streak: 0
      });
    }

    if (mode === "COOP_BOSS") {
      this.bossState.currentHp = this.bossState.totalHp;
    }

    return {
      roomCode: this.roomCode,
      players: this.players,
      bossState: this.bossState
    };
  }

  /**
   * Simula a resposta realista dos Bots em tempo real durante a rodada
   */
  startBotSimulation(currentChallenge, onBotAnsweredCallback) {
    if (this.isOnline) return; // Se estiver online, o servidor gerencia isso

    // Reseta status da rodada
    this.players.forEach(p => {
      p.hasAnswered = false;
      p.isFrozen = false;
    });

    // Para cada bot, programa um tempo de resposta realista (entre 1.8s e 7.5s)
    this.players.filter(p => p.isBot).forEach(bot => {
      const reactionDelayMs = 1800 + Math.random() * 5500;
      const willGetRight = Math.random() < 0.75; // 75% de chance de acerto

      setTimeout(() => {
        if (bot.hasAnswered || bot.isFrozen) return;

        bot.hasAnswered = true;
        let points = 0;
        if (willGetRight) {
          bot.streak++;
          points = gameEngine.calculateScore({
            isCorrect: true,
            responseTimeMs: reactionDelayMs,
            arrivalRank: 2,
            currentStreak: bot.streak,
            isBonusRound: currentChallenge.isBonusRound
          });
        } else {
          bot.streak = 0;
        }

        bot.score += points;

        if (onBotAnsweredCallback) {
          onBotAnsweredCallback({
            player: bot,
            isCorrect: willGetRight,
            points: points
          });
        }

        // Se for Co-op, acerto do bot causa dano no Boss
        if (this.gameMode === "COOP_BOSS" && willGetRight) {
          this.damageBoss(Math.floor(points * 1.2));
        }
      }, reactionDelayMs);
    });

    // Chance aleatória de um bot mandar uma reação emoji!
    setTimeout(() => {
      const emojis = ["🔥", "😮", "👏", "⚡", "😂"];
      const randomEmoji = emojis[Math.floor(Math.random() * emojis.length)];
      const randomBot = this.players.find(p => p.isBot);
      if (randomBot && this.callbacks["chat_reaction"]) {
        this.callbacks["chat_reaction"]({
          playerName: randomBot.name,
          avatar: randomBot.avatar,
          emoji: randomEmoji
        });
      }
    }, 3500 + Math.random() * 2000);
  }

  damageBoss(damage) {
    this.bossState.currentHp = Math.max(0, this.bossState.currentHp - damage);
    this.emit("boss_updated", this.bossState);
  }

  applyFreezeToOpponents(senderId) {
    this.players.forEach(p => {
      if (p.id !== senderId) {
        p.isFrozen = true;
        setTimeout(() => { p.isFrozen = false; }, 1500);
      }
    });
    this.emit("players_updated", this.players);
  }

  sendReaction(emoji, userProfile) {
    if (this.socket && this.isOnline) {
      this.socket.emit("send_reaction", { emoji, userProfile });
    } else {
      this.emit("chat_reaction", {
        playerName: userProfile.username,
        avatar: userProfile.avatar,
        emoji: emoji
      });
    }
  }

  getShareableLink() {
    return `${window.location.origin}${window.location.pathname}?sala=${this.roomCode}`;
  }

  getWhatsAppShareUrl() {
    const text = encodeURIComponent(
      `🎶 Bora jogar SoundQuiz comigo? Minha sala é: ${this.roomCode}!\nEntre pelo link: ${this.getShareableLink()}`
    );
    return `https://api.whatsapp.com/send?text=${text}`;
  }
}

// Instância global
const multiplayerManager = new MultiplayerManager();

