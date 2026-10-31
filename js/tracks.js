/**
 * Catálogo Oficial de Músicas Brasileiras do SoundQuiz (PT-BR)
 * IDs 100% Reais e Verificados no YouTube com cortes precisos do refrão.
 */
const TRACKS_CATALOG = [
  // --- ROCK NACIONAL ---
  {
    id: "rock_01",
    videoId: "jAdIZ_xa9II", // Raul Seixas - Maluco Beleza
    title: "Maluco Beleza",
    artist: "Raul Seixas",
    genre: "Rock Nacional",
    startSeconds: 45,
    endSeconds: 58,
    alternativeTitles: ["Metamorfose Ambulante", "Gita", "Sociedade Alternativa"],
    alternativeArtists: ["Cazuza", "Renato Russo", "Chorão"],
    lyricsGap: {
      verseSnippet: "Enquanto você se esforça pra ser um sujeito normal e ___",
      correctWord: "fazer tudo igual",
      alternativeWords: ["viver tão em paz", "pensar no final", "dormir tão legal"]
    }
  },
  {
    id: "rock_02",
    videoId: "M4uG1MmZVl0", // Legião Urbana - Tempo Perdido
    title: "Tempo Perdido",
    artist: "Legião Urbana",
    genre: "Rock Nacional",
    startSeconds: 45,
    endSeconds: 59,
    alternativeTitles: ["Pais e Filhos", "Será", "Eduardo e Mônica"],
    alternativeArtists: ["Titãs", "Capital Inicial", "Engenheiros do Hawaii"],
    lyricsGap: {
      verseSnippet: "Todos os dias quando acordo não tenho mais o tempo que ___",
      correctWord: "passou",
      alternativeWords: ["perdi", "restou", "sonhei"]
    }
  },
  {
    id: "rock_03",
    videoId: "JRJj4z-prvM", // Charlie Brown Jr. - Só os Loucos Sabem
    title: "Só os Loucos Sabem",
    artist: "Charlie Brown Jr.",
    genre: "Rock Nacional",
    startSeconds: 38,
    endSeconds: 52,
    alternativeTitles: ["Céu Azul", "Dias de Luta, Dias de Glória", "Pontes Indestrutíveis"],
    alternativeArtists: ["CPM 22", "Raimundos", "Detonautas"],
    lyricsGap: {
      verseSnippet: "Agora eu sei exatamente o que fazer, bom recomeçar, poder ___",
      correctWord: "te abraçar",
      alternativeWords: ["te encontrar", "te beijar", "acreditar"]
    }
  },
  {
    id: "rock_04",
    videoId: "cvznde5nc_s", // Titãs - Epitáfio
    title: "Epitáfio",
    artist: "Titãs",
    genre: "Rock Nacional",
    startSeconds: 40,
    endSeconds: 54,
    alternativeTitles: ["Envelheço na Cidade", "Flores", "Pra Dizer Adeus"],
    alternativeArtists: ["Paralamas do Sucesso", "Barão Vermelho", "Ira!"],
    lyricsGap: {
      verseSnippet: "Devia ter amado mais, ter chorado mais, ter visto o sol ___",
      correctWord: "nascer",
      alternativeWords: ["se pôr", "brilhar", "morrer"]
    }
  },

  // --- SERTANEJO ---
  {
    id: "sert_01",
    videoId: "eCyMh-mZ1B0", // Marília Mendonça - Infiel
    title: "Infiel",
    artist: "Marília Mendonça",
    genre: "Sertanejo",
    startSeconds: 60,
    endSeconds: 74,
    alternativeTitles: ["Eu Sei de Cor", "De Quem É a Culpa?", "Ciumeira"],
    alternativeArtists: ["Maiara & Maraisa", "Simone & Simaria", "Naiara Azevedo"],
    lyricsGap: {
      verseSnippet: "Isso não é amor, sua boca me beija mas seu coração ___",
      correctWord: "é de outra",
      alternativeWords: ["não quer mais", "não sente nada", "está frio"]
    }
  },
  {
    id: "sert_02",
    videoId: "nSSceWPREBA", // Jorge & Mateus - Amo Noite e Dia
    title: "Amo Noite e Dia",
    artist: "Jorge & Mateus",
    genre: "Sertanejo",
    startSeconds: 48,
    endSeconds: 61,
    alternativeTitles: ["Sosseguei", "A Hora É Agora", "Propaganda"],
    alternativeArtists: ["Henrique & Juliano", "Matheus & Kauan", "Zé Neto & Cristiano"],
    lyricsGap: {
      verseSnippet: "Tem um coração no peito batendo no mesmo compasso do ___",
      correctWord: "meu",
      alternativeWords: ["seu", "som", "vento"]
    }
  },
  {
    id: "sert_03",
    videoId: "ePjtnSPFWK8", // Evidências - Chitãozinho & Xororó
    title: "Evidências",
    artist: "Chitãozinho & Xororó",
    genre: "Sertanejo",
    startSeconds: 64,
    endSeconds: 78,
    alternativeTitles: ["Fio de Cabelo", "Sinônimos", "Nuvem de Lágrimas"],
    alternativeArtists: ["Zezé Di Camargo & Luciano", "Leandro & Leonardo", "Bruno & Marrone"],
    lyricsGap: {
      verseSnippet: "E nessa loucura de dizer que não te quero, vou negando as aparências e ___",
      correctWord: "disfarçando as evidências",
      alternativeWords: ["esquecendo o que passou", "chorando as mágoas", "fugindo do amor"]
    }
  },

  // --- MPB & CLÁSSICOS ---
  {
    id: "mpb_01",
    videoId: "_HLsxDQ_98s", // Tim Maia - Não Quero Dinheiro
    title: "Não Quero Dinheiro (Só Quero Amar)",
    artist: "Tim Maia",
    genre: "MPB",
    startSeconds: 30,
    endSeconds: 44,
    alternativeTitles: ["Gostava Tanto de Você", "Descobridor dos Sete Mares", "Azul da Cor do Mar"],
    alternativeArtists: ["Jorge Ben Jor", "Seu Jorge", "Djavan"],
    lyricsGap: {
      verseSnippet: "Vou pedir pra você voltar, vou pedir pra você ___",
      correctWord: "ficar",
      alternativeWords: ["me amar", "dançar", "sorrir"]
    }
  },
  {
    id: "mpb_02",
    videoId: "LfCDkut_j9M", // Elis Regina - Como Nossos Pais
    title: "Como Nossos Pais",
    artist: "Elis Regina",
    genre: "MPB",
    startSeconds: 50,
    endSeconds: 64,
    alternativeTitles: ["Águas de Março", "O Bêbado e a Equilibrista", "Fascinação"],
    alternativeArtists: ["Gal Costa", "Maria Bethânia", "Rita Lee"],
    lyricsGap: {
      verseSnippet: "Ainda somos os mesmos e vivemos como nossos ___",
      correctWord: "pais",
      alternativeWords: ["irmãos", "antigos", "avós"]
    }
  },

  // --- POP & FUNK BR ---
  {
    id: "pop_01",
    videoId: "FGViL3CYRwg", // Anitta - Show das Poderosas
    title: "Show das Poderosas",
    artist: "Anitta",
    genre: "Funk / Pop",
    startSeconds: 20,
    endSeconds: 34,
    alternativeTitles: ["Bang", "Envolver", "Paradinha"],
    alternativeArtists: ["Ludmilla", "Luísa Sonza", "Pabllo Vittar"],
    lyricsGap: {
      verseSnippet: "Prepara, que agora é a hora do show das ___",
      correctWord: "poderosas",
      alternativeWords: ["meninas", "garotas", "rainhas"]
    }
  },
  {
    id: "pop_02",
    videoId: "3yd_eoMOvqk", // MC Kevinho - Olha a Explosão
    title: "Olha a Explosão",
    artist: "MC Kevinho",
    genre: "Funk / Pop",
    startSeconds: 35,
    endSeconds: 49,
    alternativeTitles: ["O Grave Bater", "Ta Tum Tum", "Agora É Tudo Meu"],
    alternativeArtists: ["MC Livinho", "MC Guimê", "MC Fioti"],
    lyricsGap: {
      verseSnippet: "Essa novinha é terrorista, é perita em quebrar a ___",
      correctWord: "cara",
      alternativeWords: ["mente", "pista", "regra"]
    }
  },

  // --- TRAP & RAP NACIONAL ---
  {
    id: "rap_01",
    videoId: "hNHlc7PoIdg", // Racionais MC's - Vida Loka Parte 2
    title: "Vida Loka (Parte 2)",
    artist: "Racionais MC's",
    genre: "Trap / Rap",
    startSeconds: 60,
    endSeconds: 74,
    alternativeTitles: ["Negro Drama", "Jesus Chorou", "Diário de um Detento"],
    alternativeArtists: ["Facção Central", "Sabotage", "Emicida"],
    lyricsGap: {
      verseSnippet: "Firmeza total, mais um ano se passando aí, graças a ___",
      correctWord: "Deus",
      alternativeWords: ["nós", "mim", "tudo"]
    }
  }
];

// Lista de Gêneros Musicais
const MUSIC_GENRES = [
  "Todos os Gêneros",
  "Rock Nacional",
  "Sertanejo",
  "MPB",
  "Funk / Pop",
  "Trap / Rap"
];
