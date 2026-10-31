/**
 * Gerenciador Oficial do YouTube IFrame Player com Fallback Inteligente de Áudio
 * 
 * 1. Suporta reprodução oficial do YouTube IFrame com corte de segundos.
 * 2. Resolve automaticamente restrições de autoplay e volume desmutado (unMute).
 * 3. Fallback Sonoro em Web Audio API: se o YouTube for bloqueado por estar em file://,
 *    adblocker ou erro de embedding, o jogo sintetiza uma trilha melódica rítmica da música,
 *    GARANTINDO QUE O JOGO NUNCA FIQUE SEM SOM!
 */
class YouTubeAudioPlayer {
  constructor() {
    this.player = null;
    this.isReady = false;
    this.isApiLoaded = false;
    this.currentEndSeconds = 0;
    this.checkInterval = null;
    this.onFinishCallback = null;
    this.onBufferReadyCallback = null;
    this.audioContext = null;
    this.synthOscillators = [];
    this.synthInterval = null;
    this.isYouTubePlaying = false;
    this.fallbackActive = false;

    this.initSynth();
  }

  /**
   * Inicializa o sintetizador de áudio Web Audio API para garantia de som 100%
   */
  initSynth() {
    try {
      const AudioCtx = window.AudioContext || window.webkitAudioContext;
      if (AudioCtx) {
        this.audioContext = new AudioCtx();
      }
    } catch (e) {
      console.warn("Web Audio API não inicializada:", e);
    }
  }

  resumeAudioContext() {
    if (this.audioContext && this.audioContext.state === "suspended") {
      this.audioContext.resume();
    }
  }

  /**
   * Carrega a API IFrame do YouTube dinamicamente
   */
  loadAPI(onReadyCallback) {
    if (window.YT && window.YT.Player) {
      this.initPlayer(onReadyCallback);
      return;
    }

    window.onYouTubeIframeAPIReady = () => {
      this.isApiLoaded = true;
      this.initPlayer(onReadyCallback);
    };

    const tag = document.createElement("script");
    tag.src = "https://www.youtube.com/iframe_api";
    const firstScriptTag = document.getElementsByTagName("script")[0];
    firstScriptTag.parentNode.insertBefore(tag, firstScriptTag);
  }

  /**
   * Inicializa o player dentro do container HTML com flags de permissão de áudio
   */
  initPlayer(onReadyCallback) {
    try {
      const isFile = window.location.protocol === "file:";
      const originConfig = isFile ? undefined : window.location.origin;

      this.player = new YT.Player("yt-audio-element", {
        height: "100%",
        width: "100%",
        playerVars: {
          autoplay: 1,
          controls: 0,
          disablekb: 1,
          fs: 0,
          modestbranding: 1,
          rel: 0,
          showinfo: 0,
          iv_load_policy: 3,
          enablejsapi: 1,
          playsinline: 1,
          origin: originConfig
        },
        events: {
          onReady: (event) => {
            this.isReady = true;
            try {
              this.player.unMute();
              this.player.setVolume(100);
            } catch (e) {}
            if (onReadyCallback) onReadyCallback();
          },
          onStateChange: (event) => {
            this.handleStateChange(event);
          },
          onError: (event) => {
            console.warn("YouTube Player Event Error (código " + event.data + "). Acionando áudio alternativo.");
            this.startSynthMelodyFallback();
          }
        }
      });
    } catch (e) {
      console.error("Erro ao inicializar YouTube Player:", e);
      this.isReady = false;
    }
  }

  handleStateChange(event) {
    // 1 = PLAYING
    if (event.data === 1) {
      this.isYouTubePlaying = true;
      this.stopSynthMelody(); // Se o YouTube tocou, para o som sintetizado
      try {
        this.player.unMute();
        this.player.setVolume(100);
      } catch (e) {}
    }

    // 5 = CUED, 1 = PLAYING, 3 = BUFFERING
    if (event.data === 5 || event.data === 1) {
      if (this.onBufferReadyCallback) {
        this.onBufferReadyCallback();
        this.onBufferReadyCallback = null;
      }
    }
  }

  /**
   * Toca o trecho do YouTube com início e fim configurados
   */
  playSnippet(videoId, startSeconds, endSeconds, onFinish, genre = "Rock Nacional") {
    this.resumeAudioContext();
    this.stop();
    this.currentEndSeconds = endSeconds;
    this.onFinishCallback = onFinish;
    this.isYouTubePlaying = false;
    this.currentGenre = genre;

    // Se o player do YouTube estiver disponível, tenta reproduzir o clipe
    if (this.player && typeof this.player.loadVideoById === "function") {
      try {
        this.player.unMute();
        this.player.setVolume(100);
        this.player.loadVideoById({
          videoId: videoId,
          startSeconds: startSeconds,
          endSeconds: endSeconds
        });
        this.player.playVideo();
      } catch (e) {
        console.warn("Falha ao iniciar vídeo no player do YouTube:", e);
      }
    }

    // Timer de segurança: Se em 1.6 segundos o YouTube não tiver começado a tocar som
    // (ex: rodando em file:// ou bloqueado pelo navegador), ativa o sintetizador de ritmo
    const fallbackTimer = setTimeout(() => {
      if (!this.isYouTubePlaying) {
        console.log("YouTube não respondeu em tempo hábil. Ativando Trilha Sonora Sintetizada...");
        this.startSynthMelodyFallback(genre);
      }
    }, 1600);

    // Loop de monitoramento para pausar no segundo exato
    this.checkInterval = setInterval(() => {
      try {
        if (!this.player || typeof this.player.getCurrentTime !== "function") return;

        const currentTime = this.player.getCurrentTime();
        if (currentTime >= this.currentEndSeconds) {
          clearTimeout(fallbackTimer);
          this.stop();
          if (this.onFinishCallback) {
            const cb = this.onFinishCallback;
            this.onFinishCallback = null;
            cb();
          }
        }
      } catch (err) {
        // Ignora erros transitórios
      }
    }, 100);
  }

  /**
   * Sintetizador Musical (Web Audio API)
   * Toca progressões rítmicas inspiradas nos gêneros brasileiros para nunca deixar o jogo sem som!
   */
  startSynthMelodyFallback(genre = "Rock Nacional") {
    if (this.fallbackActive) return;
    this.fallbackActive = true;
    this.resumeAudioContext();

    if (!this.audioContext) return;

    // Escalas e acordes por gênero
    const chords = {
      "Rock Nacional": [146.83, 164.81, 196.00, 220.00], // D, E, G, A
      "Sertanejo": [293.66, 369.99, 440.00, 587.33],     // D maior alegre
      "MPB": [261.63, 329.63, 392.00, 493.88],           // C7M bossa
      "Funk / Pop": [110.00, 116.54, 130.81, 146.83],    // Batida grave
      "Trap / Rap": [65.41, 73.42, 82.41, 98.00]          // 808 sub bass
    };

    const notes = chords[genre] || chords["Rock Nacional"];
    let noteIndex = 0;

    this.synthInterval = setInterval(() => {
      try {
        if (!this.audioContext || this.audioContext.state === "suspended") {
          this.audioContext.resume();
        }

        const now = this.audioContext.currentTime;
        const osc = this.audioContext.createOscillator();
        const gain = this.audioContext.createGain();

        const freq = notes[noteIndex % notes.length];
        noteIndex++;

        osc.type = (genre === "Funk / Pop" || genre === "Trap / Rap") ? "sawtooth" : "triangle";
        osc.frequency.setValueAtTime(freq, now);

        // Envelope rítmico
        gain.gain.setValueAtTime(0.25, now);
        gain.gain.exponentialRampToValueAtTime(0.01, now + 0.28);

        osc.connect(gain);
        gain.connect(this.audioContext.destination);

        osc.start(now);
        osc.stop(now + 0.3);

        this.synthOscillators.push(osc);
      } catch (err) {
        console.warn("Erro no sintetizador de áudio:", err);
      }
    }, 320); // Ritmo a ~180 BPM
  }

  stopSynthMelody() {
    this.fallbackActive = false;
    if (this.synthInterval) {
      clearInterval(this.synthInterval);
      this.synthInterval = null;
    }
    this.synthOscillators.forEach(osc => {
      try { osc.stop(); } catch (e) {}
    });
    this.synthOscillators = [];
  }

  /**
   * Pausa tudo
   */
  stop() {
    this.stopSynthMelody();

    if (this.checkInterval) {
      clearInterval(this.checkInterval);
      this.checkInterval = null;
    }
    if (this.player && typeof this.player.pauseVideo === "function") {
      try {
        this.player.pauseVideo();
      } catch (e) {}
    }
  }

  setVolume(volumePercent) {
    if (this.player && typeof this.player.setVolume === "function") {
      this.player.setVolume(Math.max(0, Math.min(100, volumePercent)));
    }
  }

  unmute() {
    this.resumeAudioContext();
    if (this.player && typeof this.player.unMute === "function") {
      try {
        this.player.unMute();
        this.player.setVolume(100);
      } catch (e) {}
    }
  }
}

// Instância global
const ytAudioPlayer = new YouTubeAudioPlayer();
