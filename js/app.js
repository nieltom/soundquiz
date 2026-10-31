/**
 * Controlador Principal do SoundQuiz Brasil
 * Integra UI, YouTube Player, Motor de Regras e Multiplayer
 */
class SoundQuizApp {
  constructor() {
    this.currentScreen = "screen-home";
    this.selectedMode = "FFA_4P";
    this.selectedGenre = "Todos os Gêneros";
    this.currentRounds = [];
    this.currentRoundIndex = 0;
    this.currentChallenge = null;
    this.roundTimerInterval = null;
    this.roundStartTime = 0;
    this.userHasAnswered = false;
    this.userScore = 0;
    this.userStreak = 0;
    this.audioContext = null;

    this.init();
  }

  init() {
    this.bindEvents();
    this.updateProfileUI();
    this.initAudioContext();
    this.setupShop();

    // Inicia a API do YouTube
    ytAudioPlayer.loadAPI(() => {
      console.log("YouTube Player API Pronta!");
    });

    // Detecta se entrou via link de convite (ex: ?sala=BR42)
    const urlParams = new URLSearchParams(window.location.search);
    const roomFromUrl = urlParams.get("sala");
    if (roomFromUrl) {
      document.getElementById("input-room-code").value = roomFromUrl;
      this.openModal("modal-join-code");
    }

    // Listener para reações flutuantes de outros jogadores
    multiplayerManager.on("chat_reaction", (data) => {
      this.triggerFloatingEmoji(data.emoji, data.playerName);
    });

    multiplayerManager.on("boss_updated", (bossState) => {
      this.updateBossUI(bossState);
    });
  }

  initAudioContext() {
    // Web Audio API para efeitos sonoros instantâneos sem latência e sem downloads externos
    try {
      const AudioCtx = window.AudioContext || window.webkitAudioContext;
      this.audioContext = new AudioCtx();

      // Desbloqueio automático de áudio no primeiro toque para compatibilidade mobile (iOS / Android)
      const unlockAudio = () => {
        if (this.audioContext && this.audioContext.state === "suspended") {
          this.audioContext.resume();
        }
        window.removeEventListener("touchstart", unlockAudio);
        window.removeEventListener("click", unlockAudio);
      };
      window.addEventListener("touchstart", unlockAudio, { passive: true });
      window.addEventListener("click", unlockAudio);
    } catch (e) {
      console.warn("Web Audio API não suportada");
    }
  }

  playSound(type) {
    const profile = gameEngine.getProfile();
    if (!profile.soundFx || !this.audioContext) return;

    try {
      if (this.audioContext.state === "suspended") {
        this.audioContext.resume();
      }

      const osc = this.audioContext.createOscillator();
      const gain = this.audioContext.createGain();
      osc.connect(gain);
      gain.connect(this.audioContext.destination);

      const now = this.audioContext.currentTime;

      if (type === "correct") {
        // Acorde alegre de acerto
        osc.type = "sine";
        osc.frequency.setValueAtTime(523.25, now); // C5
        osc.frequency.setValueAtTime(659.25, now + 0.1); // E5
        osc.frequency.setValueAtTime(783.99, now + 0.2); // G5
        gain.gain.setValueAtTime(0.3, now);
        gain.gain.exponentialRampToValueAtTime(0.01, now + 0.45);
        osc.start(now);
        osc.stop(now + 0.5);
      } else if (type === "wrong") {
        // Tom grave de erro
        osc.type = "triangle";
        osc.frequency.setValueAtTime(160, now);
        osc.frequency.linearRampToValueAtTime(110, now + 0.25);
        gain.gain.setValueAtTime(0.3, now);
        gain.gain.exponentialRampToValueAtTime(0.01, now + 0.3);
        osc.start(now);
        osc.stop(now + 0.35);
      } else if (type === "countdown_tick") {
        osc.type = "sine";
        osc.frequency.setValueAtTime(800, now);
        gain.gain.setValueAtTime(0.1, now);
        gain.gain.exponentialRampToValueAtTime(0.01, now + 0.08);
        osc.start(now);
        osc.stop(now + 0.09);
      } else if (type === "powerup") {
        osc.type = "square";
        osc.frequency.setValueAtTime(400, now);
        osc.frequency.exponentialRampToValueAtTime(1200, now + 0.2);
        gain.gain.setValueAtTime(0.2, now);
        gain.gain.exponentialRampToValueAtTime(0.01, now + 0.3);
        osc.start(now);
        osc.stop(now + 0.35);
      }
    } catch (e) {
      // Ignora falhas de áudio
    }
  }

  bindEvents() {
    // Seleção de Modo
    document.querySelectorAll(".mode-card").forEach(card => {
      card.addEventListener("click", () => {
        document.querySelectorAll(".mode-card").forEach(c => c.classList.remove("active"));
        card.classList.add("active");
        this.selectedMode = card.getAttribute("data-mode");
      });
    });

    // Seleção de Gênero
    document.getElementById("select-genre").addEventListener("change", (e) => {
      this.selectedGenre = e.target.value;
    });

    // Botões Principais da Home
    document.getElementById("btn-quick-play").addEventListener("click", () => {
      this.startMatchDirectly();
    });

    document.getElementById("btn-create-room").addEventListener("click", () => {
      this.openLobbyRoom();
    });

    document.getElementById("btn-join-code").addEventListener("click", () => {
      this.openModal("modal-join-code");
    });

    // Sala de Espera (Lobby)
    document.getElementById("btn-copy-code").addEventListener("click", () => {
      navigator.clipboard.writeText(multiplayerManager.roomCode);
      alert("Código copiado: " + multiplayerManager.roomCode);
    });

    document.getElementById("btn-share-whatsapp").addEventListener("click", () => {
      window.open(multiplayerManager.getWhatsAppShareUrl(), "_blank");
    });

    document.getElementById("btn-start-game").addEventListener("click", () => {
      this.startGameplay();
    });

    document.getElementById("btn-leave-room").addEventListener("click", () => {
      this.showScreen("screen-home");
    });

    // Ações de Jogo
    document.getElementById("btn-play-again").addEventListener("click", () => {
      this.startMatchDirectly();
    });

    document.getElementById("btn-back-home").addEventListener("click", () => {
      this.showScreen("screen-home");
    });

    // Respostas (4 Alternativas)
    document.querySelectorAll(".option-btn").forEach(btn => {
      btn.addEventListener("click", () => {
        const optionIndex = parseInt(btn.getAttribute("data-index"));
        this.handleUserAnswer(optionIndex);
      });
    });

    // Power-ups
    document.getElementById("btn-powerup-eliminate").addEventListener("click", () => this.usePowerUp("ELIMINATE_TWO"));
    document.getElementById("btn-powerup-freeze").addEventListener("click", () => this.usePowerUp("FREEZE_OPPONENT"));
    document.getElementById("btn-powerup-hint").addEventListener("click", () => this.usePowerUp("LYRICS_HINT"));

    // Emojis de Reação
    document.querySelectorAll(".reaction-btn").forEach(btn => {
      btn.addEventListener("click", () => {
        const emoji = btn.getAttribute("data-emoji");
        const profile = gameEngine.getProfile();
        multiplayerManager.sendReaction(emoji, profile);
      });
    });

    // Modais e Configurações
    document.getElementById("btn-open-shop").addEventListener("click", () => this.openModal("modal-shop"));
    document.getElementById("btn-close-shop").addEventListener("click", () => this.closeModal("modal-shop"));
    document.getElementById("btn-open-settings").addEventListener("click", () => this.openModal("modal-settings"));
    document.getElementById("btn-close-settings").addEventListener("click", () => this.closeModal("modal-settings"));
    document.getElementById("btn-close-join").addEventListener("click", () => this.closeModal("modal-join-code"));

    // Modal Custom YouTube
    document.getElementById("btn-custom-playlist").addEventListener("click", () => this.openModal("modal-custom-youtube"));
    document.getElementById("btn-close-custom").addEventListener("click", () => this.closeModal("modal-custom-youtube"));
    document.getElementById("btn-save-custom-track").addEventListener("click", () => this.handleSaveCustomTrack());

    // Modal Premium (Login YouTube)
    const btnOpenPremium = document.getElementById("btn-open-premium");
    if (btnOpenPremium) {
      btnOpenPremium.addEventListener("click", () => this.openModal("modal-premium"));
    }
    const btnClosePremium = document.getElementById("btn-close-premium");
    if (btnClosePremium) {
      btnClosePremium.addEventListener("click", () => this.closeModal("modal-premium"));
    }
    const btnLoginGoogle = document.getElementById("btn-login-google");
    if (btnLoginGoogle) {
      btnLoginGoogle.addEventListener("click", () => {
        window.open("https://accounts.google.com/ServiceLogin?service=youtube&continue=https://www.youtube.com", "_blank");
      });
    }
    const btnActivatePremium = document.getElementById("btn-activate-premium");
    if (btnActivatePremium) {
      btnActivatePremium.addEventListener("click", () => {
        const profile = gameEngine.getProfile();
        profile.isPremium = true;
        gameEngine.saveProfile(profile);
        this.updateProfileUI();
        this.closeModal("modal-premium");
        alert("👑 Modo Premium ativado! Se você já fez login no YouTube neste navegador, os vídeos agora tocarão sem anúncios.");
      });
    }

    // Botão Pular Anúncio (Force Skip / Seek to startSeconds)
    const skipAdBtn = document.getElementById("btn-skip-ad");
    if (skipAdBtn) {
      skipAdBtn.addEventListener("click", () => {
        if (this.currentChallenge && this.currentChallenge.track) {
          ytAudioPlayer.skipAd(this.currentChallenge.track.startSeconds);
          skipAdBtn.textContent = "⏩ Pulando...";
          setTimeout(() => { skipAdBtn.textContent = "⏩ Pular Anúncio"; }, 1000);
        }
      });
    }

    // Botão de Desmutar Áudio na tela de jogo
    const unmuteBtn = document.getElementById("btn-unmute-game");
    if (unmuteBtn) {
      unmuteBtn.addEventListener("click", () => {
        ytAudioPlayer.unmute();
        this.playSound("correct");
        unmuteBtn.textContent = "🔊 Som Ligado!";
        setTimeout(() => { unmuteBtn.textContent = "🔊 Ativar Som"; }, 1500);
      });
    }

    // Botão de Testar Áudio no modal de configurações
    const testSoundBtn = document.getElementById("btn-test-sound");
    if (testSoundBtn) {
      testSoundBtn.addEventListener("click", () => {
        this.playSound("correct");
        ytAudioPlayer.unmute();
      });
    }

    document.getElementById("btn-confirm-join").addEventListener("click", () => {
      const code = document.getElementById("input-room-code").value.trim().toUpperCase();
      if (code) {
        multiplayerManager.roomCode = code;
        this.closeModal("modal-join-code");
        this.openLobbyRoom();
      }
    });

    // Alternar Alto Contraste
    const contrastBtn = document.getElementById("btn-toggle-contrast");
    const contrastCheck = document.getElementById("check-high-contrast");
    const toggleContrast = () => {
      const profile = gameEngine.getProfile();
      profile.highContrast = !profile.highContrast;
      gameEngine.saveProfile(profile);
      document.body.classList.toggle("high-contrast", profile.highContrast);
      contrastCheck.checked = profile.highContrast;
    };
    contrastBtn.addEventListener("click", toggleContrast);
    contrastCheck.addEventListener("change", toggleContrast);
  }

  showScreen(screenId) {
    document.querySelectorAll(".screen").forEach(s => s.classList.remove("active"));
    const target = document.getElementById(screenId);
    if (target) {
      target.classList.add("active");
      this.currentScreen = screenId;
    }
  }

  openModal(modalId) {
    document.getElementById(modalId).classList.add("active");
  }

  closeModal(modalId) {
    document.getElementById(modalId).classList.remove("active");
  }

  handleSaveCustomTrack() {
    const inputUrl = document.getElementById("custom-yt-url").value.trim();
    const title = document.getElementById("custom-yt-title").value.trim() || "Música Custom";
    const artist = document.getElementById("custom-yt-artist").value.trim() || "Artista YouTube";
    const startSec = parseInt(document.getElementById("custom-yt-start").value) || 30;
    const endSec = parseInt(document.getElementById("custom-yt-end").value) || (startSec + 13);

    if (!inputUrl) {
      alert("Por favor, informe a URL ou o ID do vídeo do YouTube!");
      return;
    }

    // Extrai o ID de 11 caracteres
    const ytRegex = /(?:youtu\.be\/|youtube\.com\/(?:embed\/|v\/|watch\?v=|watch\?.+&v=))([\w-]{11})/;
    const match = inputUrl.match(ytRegex);
    const videoId = match ? match[1] : inputUrl;

    if (videoId.length !== 11) {
      alert("ID do YouTube inválido! Deve conter exatamente 11 caracteres.");
      return;
    }

    const newTrack = {
      id: "custom_" + Date.now(),
      videoId: videoId,
      title: title,
      artist: artist,
      genre: "Personalizadas",
      startSeconds: startSec,
      endSeconds: endSec,
      alternativeTitles: [title + " (Remix)", "Outra Canção", "Sucesso Acústico"],
      alternativeArtists: ["Outro Cantor", "Banda Concorrente", "DJ Convidado"],
      lyricsGap: {
        verseSnippet: `Trecho da música "${title}" por ${artist}: ___`,
        correctWord: title,
        alternativeWords: ["Amor", "Saudade", "Coração"]
      }
    };

    TRACKS_CATALOG.push(newTrack);

    // Adiciona o gênero Personalizadas no dropdown caso ainda não exista
    const selectGenre = document.getElementById("select-genre");
    let optionExists = false;
    for (let i = 0; i < selectGenre.options.length; i++) {
      if (selectGenre.options[i].value === "Personalizadas") {
        optionExists = true;
        break;
      }
    }

    if (!optionExists) {
      const opt = document.createElement("option");
      opt.value = "Personalizadas";
      opt.textContent = "⭐ Músicas Personalizadas (" + title + ")";
      selectGenre.appendChild(opt);
    }

    selectGenre.value = "Personalizadas";
    this.selectedGenre = "Personalizadas";

    this.closeModal("modal-custom-youtube");
    alert(`Música "${title}" adicionada com sucesso! O gênero "Personalizadas" foi selecionado para sua próxima partida.`);
  }

  updateProfileUI() {
    const profile = gameEngine.getProfile();
    document.getElementById("header-avatar").textContent = profile.avatar;
    document.getElementById("header-username").textContent = profile.username;
    document.getElementById("header-rank").textContent = profile.rank;
    document.getElementById("header-coins").textContent = profile.coins;

    // Badges de powerups
    document.getElementById("badge-eliminate").textContent = profile.powerUps.ELIMINATE_TWO;
    document.getElementById("badge-freeze").textContent = profile.powerUps.FREEZE_OPPONENT;
    document.getElementById("badge-hint").textContent = profile.powerUps.LYRICS_HINT;

    // Selo Premium
    const btnPrem = document.getElementById("btn-open-premium");
    if (btnPrem && profile.isPremium) {
      btnPrem.textContent = "👑 PREMIUM";
      btnPrem.style.background = "#10b981";
      btnPrem.style.color = "#fff";
    }

    if (profile.highContrast) {
      document.body.classList.add("high-contrast");
      document.getElementById("check-high-contrast").checked = true;
    }
  }

  openLobbyRoom() {
    const profile = gameEngine.getProfile();
    const roomData = multiplayerManager.createRoom(this.selectedMode, profile);

    document.getElementById("room-code-display").textContent = roomData.roomCode;
    document.getElementById("room-player-count").textContent = roomData.players.length;

    const listContainer = document.getElementById("room-players-list");
    listContainer.innerHTML = "";

    roomData.players.forEach(p => {
      const item = document.createElement("div");
      item.style.cssText = "display: flex; align-items: center; justify-content: space-between; background: var(--bg-card); padding: 10px 14px; border-radius: 12px; border: 1px solid var(--border-color);";
      item.innerHTML = `
        <div style="display: flex; align-items: center; gap: 10px;">
          <span style="font-size: 24px;">${p.avatar}</span>
          <div>
            <div style="font-weight: 700; font-size: 14px;">${p.name}</div>
            <div style="font-size: 11px; color: var(--text-secondary);">${p.isHost ? "👑 Anfitrião" : "Jogador Conectado"}</div>
          </div>
        </div>
        <span style="color: var(--accent-green); font-size: 12px; font-weight: 800;">PRONTO ✔</span>
      `;
      listContainer.appendChild(item);
    });

    this.showScreen("screen-room");
  }

  startMatchDirectly() {
    const profile = gameEngine.getProfile();
    multiplayerManager.createRoom(this.selectedMode, profile);
    this.startGameplay();
  }

  startGameplay() {
    this.currentRounds = gameEngine.generateRounds(this.selectedGenre, 7);
    this.currentRoundIndex = 0;
    this.userScore = 0;
    this.userStreak = 0;

    // Reseta pontuação dos jogadores no multiplayer
    multiplayerManager.players.forEach(p => {
      p.score = 0;
      p.streak = 0;
    });

    // Se for modo Boss, exibe barra do Boss
    const bossContainer = document.getElementById("game-boss-container");
    if (this.selectedMode === "COOP_BOSS") {
      bossContainer.classList.add("visible");
      this.updateBossUI(multiplayerManager.bossState);
    } else {
      bossContainer.classList.remove("visible");
    }

    this.showScreen("screen-game");
    this.playNextRound();
  }

  playNextRound() {
    if (this.currentRoundIndex >= this.currentRounds.length) {
      this.endGame();
      return;
    }

    const challenge = this.currentRounds[this.currentRoundIndex];
    this.currentChallenge = challenge;
    this.userHasAnswered = false;

    // Atualiza cabeçalho da rodada
    document.getElementById("game-round-indicator").textContent = `RODADA ${challenge.roundNumber}/${this.currentRounds.length}`;
    const bonusPill = document.getElementById("game-bonus-pill");
    bonusPill.style.display = challenge.isBonusRound ? "block" : "none";

    // Atualiza o texto da pergunta
    document.getElementById("game-question-text").textContent = challenge.questionText;

    // Atualiza opções nos botões
    const optionButtons = document.querySelectorAll(".option-btn");
    optionButtons.forEach((btn, idx) => {
      btn.className = "option-btn";
      btn.disabled = false;
      const option = challenge.options[idx];
      if (option) {
        btn.textContent = option.text;
        btn.style.display = "flex";
      } else {
        btn.style.display = "none";
      }
    });

    // Atualiza placar dos 4 jogadores
    this.renderPlayersBar();

    // Inicia rotação do disco de vinil
    const vinyl = document.getElementById("vinyl-disc");
    vinyl.classList.remove("paused");
    document.getElementById("soundwave-status").textContent = "Tocando trecho musical...";

    // Toca o trecho oficial do clipe do YouTube
    ytAudioPlayer.playSnippet(
      challenge.track.videoId,
      challenge.track.startSeconds,
      challenge.track.endSeconds,
      () => {
        document.getElementById("soundwave-status").textContent = "Tempo esgotando!";
      }
    );

    // Inicia simulação de respostas dos oponentes bots
    multiplayerManager.startBotSimulation(challenge, (data) => {
      this.renderPlayersBar();
    });

    // Inicia a barra de tempo (10 segundos)
    this.startRoundTimer(10000);
  }

  startRoundTimer(durationMs) {
    if (this.roundTimerInterval) clearInterval(this.roundTimerInterval);

    this.roundStartTime = Date.now();
    const timerFill = document.getElementById("game-timer-fill");
    timerFill.style.width = "100%";
    timerFill.style.backgroundColor = "var(--accent-green)";

    this.roundTimerInterval = setInterval(() => {
      const elapsed = Date.now() - this.roundStartTime;
      const remainingRatio = Math.max(0, 1 - (elapsed / durationMs));

      timerFill.style.width = `${remainingRatio * 100}%`;

      if (remainingRatio > 0.5) {
        timerFill.style.backgroundColor = "var(--accent-green)";
      } else if (remainingRatio > 0.2) {
        timerFill.style.backgroundColor = "var(--accent-gold)";
      } else {
        timerFill.style.backgroundColor = "var(--accent-red)";
      }

      if (elapsed >= durationMs) {
        clearInterval(this.roundTimerInterval);
        this.onRoundTimeout();
      }
    }, 50);
  }

  handleUserAnswer(optionIndex) {
    if (this.userHasAnswered) return;
    this.userHasAnswered = true;

    const responseTimeMs = Date.now() - this.roundStartTime;
    const selectedOption = this.currentChallenge.options[optionIndex];
    const isCorrect = selectedOption.isCorrect;

    const optionButtons = document.querySelectorAll(".option-btn");
    const clickedBtn = optionButtons[optionIndex];

    if (isCorrect) {
      this.userStreak++;
      const points = gameEngine.calculateScore({
        isCorrect: true,
        responseTimeMs,
        arrivalRank: 1,
        currentStreak: this.userStreak,
        isBonusRound: this.currentChallenge.isBonusRound
      });

      this.userScore += points;
      const userPlayer = multiplayerManager.players.find(p => p.id === "p_user");
      if (userPlayer) {
        userPlayer.score = this.userScore;
        userPlayer.hasAnswered = true;
      }

      clickedBtn.classList.add("correct");
      this.playSound("correct");

      // Causa dano no Boss
      if (this.selectedMode === "COOP_BOSS") {
        multiplayerManager.damageBoss(Math.floor(points * 1.2));
      }
    } else {
      this.userStreak = 0;
      clickedBtn.classList.add("wrong");
      this.playSound("wrong");

      // Mostra qual era a correta
      this.currentChallenge.options.forEach((opt, idx) => {
        if (opt.isCorrect) {
          optionButtons[idx].classList.add("correct");
        }
      });
    }

    this.renderPlayersBar();
  }

  onRoundTimeout() {
    ytAudioPlayer.stop();
    const vinyl = document.getElementById("vinyl-disc");
    vinyl.classList.add("paused");

    // Revela a alternativa correta se o usuário não respondeu
    const optionButtons = document.querySelectorAll(".option-btn");
    optionButtons.forEach((btn, idx) => {
      btn.disabled = true;
      const opt = this.currentChallenge.options[idx];
      if (opt && opt.isCorrect) {
        btn.classList.add("correct");
      }
    });

    document.getElementById("soundwave-status").textContent = `Resposta: ${this.currentChallenge.correctText}`;

    // Intervalo de 2.2 segundos para conferência antes da próxima rodada
    setTimeout(() => {
      this.currentRoundIndex++;
      this.playNextRound();
    }, 2200);
  }

  renderPlayersBar() {
    const bar = document.getElementById("game-players-bar");
    bar.innerHTML = "";

    multiplayerManager.players.forEach(p => {
      const slot = document.createElement("div");
      slot.className = `player-slot ${p.hasAnswered ? "answered" : ""} ${p.isFrozen ? "frozen" : ""}`;
      slot.innerHTML = `
        <div class="avatar-wrapper">
          <span>${p.avatar}</span>
        </div>
        <div class="name">${p.name}</div>
        <div class="score">${p.score}</div>
      `;
      bar.appendChild(slot);
    });
  }

  updateBossUI(bossState) {
    const fill = document.getElementById("boss-hp-fill");
    const text = document.getElementById("boss-hp-text");
    const pct = Math.max(0, (bossState.currentHp / bossState.totalHp) * 100);
    fill.style.width = `${pct}%`;
    text.textContent = `${bossState.currentHp} / ${bossState.totalHp} HP`;
  }

  usePowerUp(type) {
    if (this.userHasAnswered) return;

    const profile = gameEngine.getProfile();
    if (profile.powerUps[type] <= 0) {
      alert("Você não possui mais este power-up! Ganhe moedas para comprar mais.");
      return;
    }

    profile.powerUps[type]--;
    gameEngine.saveProfile(profile);
    this.updateProfileUI();
    this.playSound("powerup");

    const result = gameEngine.applyPowerUp(type, this.currentChallenge);

    if (type === "ELIMINATE_TWO") {
      const optionButtons = document.querySelectorAll(".option-btn");
      this.currentChallenge.options.forEach((opt, idx) => {
        if (opt.eliminated) {
          optionButtons[idx].classList.add("eliminated");
        }
      });
    } else if (type === "FREEZE_OPPONENT") {
      multiplayerManager.applyFreezeToOpponents("p_user");
    } else if (type === "LYRICS_HINT") {
      alert(result.message);
    }
  }

  triggerFloatingEmoji(emoji, senderName) {
    const floater = document.createElement("div");
    floater.className = "floating-reaction";
    floater.textContent = emoji;
    document.getElementById("app-container").appendChild(floater);

    setTimeout(() => {
      floater.remove();
    }, 2000);
  }

  endGame() {
    ytAudioPlayer.stop();

    // Ordena os jogadores por pontuação
    const sorted = [...multiplayerManager.players].sort((a, b) => b.score - a.score);
    const isWinner = sorted[0].id === "p_user";

    // Adiciona recompensas
    const rewards = gameEngine.addRewards(this.userScore, isWinner);
    this.updateProfileUI();

    document.getElementById("reward-score").textContent = `+${this.userScore}`;
    document.getElementById("reward-coins").textContent = `+${rewards.coinsEarned} 🪙`;
    document.getElementById("reward-xp").textContent = `+${rewards.xpEarned} XP`;

    // Renderiza o Pódio dos Vencedores
    const podium = document.getElementById("results-podium");
    podium.innerHTML = "";

    const places = [
      { player: sorted[1] || { avatar: "🥈", name: "2º Lugar", score: 0 }, placeClass: "podium-2nd", rankNum: "2º" },
      { player: sorted[0] || { avatar: "👑", name: "1º Lugar", score: 0 }, placeClass: "podium-1st", rankNum: "1º" },
      { player: sorted[2] || { avatar: "🥉", name: "3º Lugar", score: 0 }, placeClass: "podium-3rd", rankNum: "3º" }
    ];

    places.forEach(p => {
      const div = document.createElement("div");
      div.className = `podium-place ${p.placeClass}`;
      div.innerHTML = `
        <div style="font-size: 28px; margin-bottom: 4px;">${p.player.avatar}</div>
        <div style="font-size: 11px; font-weight: 700; white-space: nowrap; overflow: hidden; text-overflow: ellipsis; max-width: 80px;">${p.player.name}</div>
        <div style="font-size: 11px; color: var(--accent-gold); font-weight: 800; margin-bottom: 6px;">${p.player.score} pts</div>
        <div class="podium-pedestal">${p.rankNum}</div>
      `;
      podium.appendChild(div);
    });

    this.showScreen("screen-results");
  }

  setupShop() {
    const shopAvatars = [
      { emoji: "🎸", price: 0 },
      { emoji: "🎤", price: 0 },
      { emoji: "🎹", price: 0 },
      { emoji: "🎧", price: 0 },
      { emoji: "🎷", price: 150 },
      { emoji: "🥁", price: 150 },
      { emoji: "🎺", price: 250 },
      { emoji: "🪗", price: 300 },
      { emoji: "👑", price: 500 },
      { emoji: "⚡", price: 500 },
      { emoji: "🔥", price: 750 },
      { emoji: "👽", price: 1000 }
    ];

    const grid = document.getElementById("shop-avatars-grid");
    grid.innerHTML = "";

    shopAvatars.forEach(item => {
      const btn = document.createElement("button");
      btn.style.cssText = "background: var(--bg-card-hover); border: 1px solid var(--border-color); border-radius: 12px; padding: 10px; display: flex; flex-direction: column; align-items: center; cursor: pointer; color: #fff;";
      btn.innerHTML = `
        <span style="font-size: 28px;">${item.emoji}</span>
        <span style="font-size: 10px; color: var(--accent-gold); margin-top: 4px; font-weight: 700;">
          ${item.price === 0 ? "Grátis" : item.price + " 🪙"}
        </span>
      `;

      btn.addEventListener("click", () => {
        const profile = gameEngine.getProfile();
        if (profile.unlockedAvatars.includes(item.emoji)) {
          // Equipa
          profile.avatar = item.emoji;
          gameEngine.saveProfile(profile);
          this.updateProfileUI();
          alert(`Avatar ${item.emoji} equipado com sucesso!`);
        } else {
          // Compra
          if (profile.coins >= item.price) {
            profile.coins -= item.price;
            profile.unlockedAvatars.push(item.emoji);
            profile.avatar = item.emoji;
            gameEngine.saveProfile(profile);
            this.updateProfileUI();
            alert(`Parabéns! Você comprou e equipou o avatar ${item.emoji}!`);
          } else {
            alert(`Moedas insuficientes! Você tem ${profile.coins} 🪙 e precisa de ${item.price} 🪙.`);
          }
        }
      });

      grid.appendChild(btn);
    });
  }
}

// Inicializa a aplicação ao carregar o DOM
window.addEventListener("DOMContentLoaded", () => {
  window.app = new SoundQuizApp();
});

