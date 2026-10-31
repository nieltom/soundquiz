/**
 * Motor de Áudio Direto de Estúdio (100% Sem Anúncios)
 * Reproduz previews oficiais de 30s direto da CDN via HTML5 Audio nativo.
 * Zero propagandas, zero latência e compatível com 100% dos navegadores mobile.
 */
class CleanAudioEngine {
  constructor() {
    this.audio = new Audio();
    this.audio.preload = "auto";
    this.timer = null;
    this.onFinishCallback = null;
    this.currentAudioUrl = null;
  }

  /**
   * Compatibilidade com a interface anterior
   */
  loadAPI(onReadyCallback) {
    if (onReadyCallback) onReadyCallback();
  }

  /**
   * Toca o trecho de áudio sem nenhuma propaganda
   */
  playSnippet(audioUrl, startSeconds = 0, endSeconds = 10, onFinish) {
    this.stop();
    this.onFinishCallback = onFinish;
    this.currentAudioUrl = audioUrl;

    if (!audioUrl) {
      console.warn("Nenhum audioUrl fornecido.");
      return;
    }

    try {
      this.audio.src = audioUrl;
      this.audio.currentTime = 0;
      this.audio.volume = 1.0;

      const playPromise = this.audio.play();
      if (playPromise !== undefined) {
        playPromise.catch(err => {
          console.log("Autoplay aguardando interação do usuário:", err);
        });
      }
    } catch (e) {
      console.error("Erro ao reproduzir áudio:", e);
    }

    // Cronômetro para encerrar o trecho em 10 segundos
    const durationMs = (endSeconds - startSeconds || 10) * 1000;
    this.timer = setTimeout(() => {
      this.stop();
      if (this.onFinishCallback) {
        const cb = this.onFinishCallback;
        this.onFinishCallback = null;
        cb();
      }
    }, durationMs);
  }

  /**
   * Pausa e reseta o áudio
   */
  stop() {
    if (this.timer) {
      clearTimeout(this.timer);
      this.timer = null;
    }
    try {
      this.audio.pause();
      this.audio.currentTime = 0;
    } catch (e) {}
  }

  setVolume(volumePercent) {
    try {
      this.audio.volume = Math.max(0, Math.min(1, volumePercent / 100));
    } catch (e) {}
  }

  unmute() {
    try {
      this.audio.volume = 1.0;
      this.audio.play().catch(() => {});
    } catch (e) {}
  }

  skipAd() {
    // Como agora é 0% anúncios, skipAd apenas reseta para o início do trecho!
    try {
      this.audio.currentTime = 0;
      this.audio.play().catch(() => {});
    } catch (e) {}
  }
}

// Instância global (mantendo o nome para compatibilidade com a arquitetura)
const ytAudioPlayer = new CleanAudioEngine();
