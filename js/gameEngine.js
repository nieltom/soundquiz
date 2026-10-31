/**
 * Motor de Regras, Modos de Jogo, Gamificação e Pontuação do SoundQuiz
 */
class GameEngine {
  constructor() {
    this.BASE_POINTS = 500;
    this.MAX_SPEED_POINTS = 500;
    this.STREAK_BONUS_PER_HIT = 30;
    this.MAX_STREAK_BONUS = 180;
    this.ROUND_TIME_MS = 10000; // 10 segundos por rodada
  }

  /**
   * Gera as rodadas da partida de forma 100% aleatória e dinâmica
   */
  generateRounds(genre = "Todos os Gêneros", totalRounds = 7, challengeMode = "ALL") {
    // 1. Filtrar músicas pelo gênero selecionado
    let availableTracks = TRACKS_CATALOG;
    if (genre !== "Todos os Gêneros") {
      const filtered = TRACKS_CATALOG.filter(t => t.genre === genre);
      if (filtered.length >= totalRounds) {
        availableTracks = filtered;
      }
    }

    // 2. Embaralhamento completo e imparcial (Fisher-Yates Shuffle)
    const pool = [...availableTracks];
    for (let i = pool.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [pool[i], pool[j]] = [pool[j], pool[i]];
    }

    // Se o modo for COMPLETE_LYRICS, garante que faixas com lyricsGap estejam presentes
    if (challengeMode === "COMPLETE_LYRICS") {
      pool.sort((a, b) => (b.lyricsGap ? 1 : 0) - (a.lyricsGap ? 1 : 0));
    }

    // 3. Seleciona as faixas não repetidas para a partida
    const selectedTracks = pool.slice(0, Math.min(totalRounds, pool.length));

    // Tipos de desafios disponíveis sorteados aleatoriamente
    const challengeTypes = ["GUESS_TITLE", "GUESS_ARTIST", "COMPLETE_LYRICS"];

    return selectedTracks.map((track, index) => {
      let chosenType = challengeMode;
      if (!challengeMode || challengeMode === "ALL") {
        chosenType = challengeTypes[Math.floor(Math.random() * challengeTypes.length)];
      }

      const isBonusRound = (index === totalRounds - 1);
      return this.buildChallenge(track, chosenType, index + 1, isBonusRound);
    });
  }

  /**
   * Constrói os dados do desafio com 4 alternativas embaralhadas
   */
  buildChallenge(track, challengeType, roundNumber, isBonusRound) {
    let questionText = "";
    let correctText = "";
    let options = [];
    let startSeconds = 0;
    let cutSeconds = 10;

    if (challengeType === "GUESS_TITLE") {
      questionText = "Qual é o nome desta música?";
      correctText = track.title;
      const otherTracks = TRACKS_CATALOG.filter(t => t.id !== track.id && t.title !== track.title);
      const shuffledOthers = [...otherTracks].sort(() => Math.random() - 0.5);
      const wrong = shuffledOthers.slice(0, 3).map(t => t.title);
      options = [correctText, ...wrong].sort(() => Math.random() - 0.5);
      startSeconds = 0;
      cutSeconds = 10;
    } else if (challengeType === "GUESS_ARTIST") {
      questionText = "Quem canta este sucesso?";
      correctText = track.artist;
      const otherArtists = [...new Set(TRACKS_CATALOG.filter(t => t.artist !== track.artist).map(t => t.artist))];
      const shuffledArtists = otherArtists.sort(() => Math.random() - 0.5);
      const wrong = shuffledArtists.slice(0, 3);
      options = [correctText, ...wrong].sort(() => Math.random() - 0.5);
      startSeconds = 0;
      cutSeconds = 10;
    } else {
      // COMPLETE_LYRICS: Trecho exato da mensagem tocado até pausar antes da palavra final
      challengeType = "COMPLETE_LYRICS";
      const gap = track.lyricsGap || {
        verseSnippet: "Quem sabe ainda sou uma...",
        correctWord: "garotinha",
        alternativeWords: ["menina", "mulher", "criança"],
        startSeconds: 0,
        cutSeconds: 5.4
      };

      questionText = gap.verseSnippet;
      correctText = gap.correctWord;
      const wrong = (gap.alternativeWords && gap.alternativeWords.length >= 3)
        ? gap.alternativeWords
        : ["amor", "coração", "vida"];

      options = [correctText, ...wrong].sort(() => Math.random() - 0.5);
      startSeconds = (gap.startSeconds !== undefined) ? gap.startSeconds : 0;
      cutSeconds = gap.cutSeconds || 5.5;
    }

    return {
      roundNumber,
      isBonusRound,
      challengeType,
      questionText,
      track,
      correctText,
      startSeconds,
      cutSeconds,
      options: options.map((text, i) => ({
        id: `opt_${i}`,
        text,
        isCorrect: text === correctText,
        eliminated: false
      }))
    };
  }

  /**
   * Calcula os pontos com servidor/motor autoritativo
   */
  calculateScore({ isCorrect, responseTimeMs, arrivalRank = 1, currentStreak = 0, isBonusRound = false }) {
    if (!isCorrect) {
      return 0;
    }

    const clampedTime = Math.max(0, Math.min(responseTimeMs, this.ROUND_TIME_MS));
    const speedRatio = 1 - (clampedTime / this.ROUND_TIME_MS);
    const speedPoints = Math.floor(this.MAX_SPEED_POINTS * speedRatio);

    // Bônus de chegada entre quem acertou
    let placementBonus = 0;
    if (arrivalRank === 1) placementBonus = 120;
    else if (arrivalRank === 2) placementBonus = 60;
    else if (arrivalRank === 3) placementBonus = 20;

    // Bônus por sequência de acertos
    const streakBonus = Math.min(currentStreak * this.STREAK_BONUS_PER_HIT, this.MAX_STREAK_BONUS);

    const baseSum = this.BASE_POINTS + speedPoints + placementBonus + streakBonus;
    const multiplier = isBonusRound ? 2 : 1;

    return baseSum * multiplier;
  }

  /**
   * Executa o efeito do Power-Up
   */
  applyPowerUp(type, currentChallenge) {
    if (type === "ELIMINATE_TWO") {
      // Elimina 2 opções erradas
      const wrongOptions = currentChallenge.options.filter(o => !o.isCorrect && !o.eliminated);
      const shuffledWrong = wrongOptions.sort(() => Math.random() - 0.5);
      const toEliminate = shuffledWrong.slice(0, 2);
      toEliminate.forEach(o => o.eliminated = true);
      return { success: true, message: "2 opções incorretas foram eliminadas!" };
    }

    if (type === "FREEZE_OPPONENT") {
      return { success: true, message: "Adversários congelados por 1.5s!" };
    }

    if (type === "LYRICS_HINT") {
      const hint = currentChallenge.correctText.slice(0, 3).toUpperCase();
      return { success: true, message: `Dica: começa com "${hint}..."` };
    }

    return { success: false, message: "Power-up desconhecido." };
  }

  /**
   * Gerenciamento de Perfil no LocalStorage
   */
  getProfile() {
    const defaultProfile = {
      username: "SomPlayer_" + Math.floor(100 + Math.random() * 900),
      avatar: "🎸",
      coins: 250,
      xp: 0,
      level: 1,
      rank: "Bronze I",
      highContrast: false,
      soundFx: true,
      powerUps: {
        ELIMINATE_TWO: 3,
        FREEZE_OPPONENT: 2,
        LYRICS_HINT: 3
      },
      unlockedAvatars: ["🎸", "🎤", "🎹", "🎧"]
    };

    try {
      const saved = localStorage.getItem("soundquiz_user_profile");
      if (saved) return JSON.parse(saved);
    } catch (e) {
      console.warn("Falha ao ler perfil do localStorage", e);
    }
    this.saveProfile(defaultProfile);
    return defaultProfile;
  }

  saveProfile(profile) {
    try {
      localStorage.setItem("soundquiz_user_profile", JSON.stringify(profile));
    } catch (e) {
      console.warn("Falha ao salvar perfil", e);
    }
  }

  addRewards(earnedScore, isWinner = false) {
    const profile = this.getProfile();
    const coinsEarned = Math.floor(earnedScore / 35) + (isWinner ? 60 : 15);
    const xpEarned = Math.floor(earnedScore / 8) + (isWinner ? 250 : 80);

    profile.coins += coinsEarned;
    profile.xp += xpEarned;

    // Atualiza nível a cada 1000 XP
    profile.level = Math.floor(profile.xp / 1000) + 1;

    // Atualiza Patente
    if (profile.xp >= 10000) profile.rank = "Mestre do Som (Ouro Supremo)";
    else if (profile.xp >= 5000) profile.rank = "Ouro";
    else if (profile.xp >= 2000) profile.rank = "Prata";
    else profile.rank = "Bronze";

    this.saveProfile(profile);
    return { coinsEarned, xpEarned, newProfile: profile };
  }
}

// Exporta instância global
const gameEngine = new GameEngine();

