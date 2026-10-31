/**
 * Gerenciador Oficial do YouTube IFrame Player
 * Executa os clipes de áudio oficiais do YouTube com início e fim configuráveis em segundos.
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
    this.currentVideoId = null;
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
   * Inicializa o player dentro do container HTML
   */
  initPlayer(onReadyCallback) {
    try {
      this.player = new YT.Player("yt-audio-element", {
        height: "100%",
        width: "100%",
        playerVars: {
          autoplay: 1,
          controls: 1,
          playsinline: 1,
          enablejsapi: 1,
          rel: 0,
          fs: 0,
          modestbranding: 1
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
            console.warn("YouTube Player Event Error (código " + event.data + ")");
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
  playSnippet(videoId, startSeconds, endSeconds, onFinish) {
    this.stop();
    this.currentStartSeconds = startSeconds;
    this.currentEndSeconds = endSeconds;
    this.onFinishCallback = onFinish;
    this.currentVideoId = videoId;

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
        console.warn("Falha ao chamar loadVideoById:", e);
      }
    }

    // Loop de monitoramento para pausar no segundo exato
    this.checkInterval = setInterval(() => {
      try {
        if (!this.player || typeof this.player.getCurrentTime !== "function") return;

        const currentTime = this.player.getCurrentTime();
        if (currentTime >= this.currentEndSeconds) {
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
   * Pausa tudo
   */
  stop() {
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
    if (this.player && typeof this.player.unMute === "function") {
      try {
        this.player.unMute();
        this.player.setVolume(100);
        this.player.playVideo();
      } catch (e) {}
    }
  }

  skipAd(targetSeconds) {
    if (this.player && typeof this.player.seekTo === "function") {
      try {
        const sec = targetSeconds || this.currentStartSeconds || 30;
        this.player.seekTo(sec, true);
        this.player.unMute();
        this.player.setVolume(100);
        this.player.playVideo();
      } catch (e) {
        console.warn("Falha ao pular anúncio:", e);
      }
    }
  }
}

// Instância global
const ytAudioPlayer = new YouTubeAudioPlayer();
