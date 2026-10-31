/**
 * Catálogo Oficial de Músicas Brasileiras do SoundQuiz (PT-BR)
 * Cada faixa possui cortes milimétricos validados para o trecho mais reconhecível (refrão),
 * opções alternativas balanceadas e desafios de completar a letra.
 */
const TRACKS_CATALOG = [
  // --- ROCK NACIONAL ---
  {
    id: "rock_01",
    videoId: "kXYiU_JCYtU", // Raul Seixas - Maluco Beleza
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
    videoId: "r3kQdJXYeYo", // Legião Urbana - Tempo Perdido
    title: "Tempo Perdido",
    artist: "Legião Urbana",
    genre: "Rock Nacional",
    startSeconds: 52,
    endSeconds: 65,
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
    videoId: "qZ2gKz_rI2U", // Charlie Brown Jr. - Só os Loucos Sabem
    title: "Só os Loucos Sabem",
    artist: "Charlie Brown Jr.",
    genre: "Rock Nacional",
    startSeconds: 38,
    endSeconds: 51,
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
    videoId: "7e_Y_m5n4_0", // Titãs - Epitáfio
    title: "Epitáfio",
    artist: "Titãs",
    genre: "Rock Nacional",
    startSeconds: 40,
    endSeconds: 53,
    alternativeTitles: ["Envelheço na Cidade", "Flores", "Pra Dizer Adeus"],
    alternativeArtists: ["Paralamas do Sucesso", "Barão Vermelho", "Ira!"],
    lyricsGap: {
      verseSnippet: "Devia ter amado mais, ter chorado mais, ter visto o sol ___",
      correctWord: "nascer",
      alternativeWords: ["se pôr", "brilhar", "morrer"]
    }
  },
  {
    id: "rock_05",
    videoId: "oQp2s5n0v3k", // Cazuza - Exagerado
    title: "Exagerado",
    artist: "Cazuza",
    genre: "Rock Nacional",
    startSeconds: 50,
    endSeconds: 63,
    alternativeTitles: ["Codinome Beija-Flor", "Ideologia", "O Tempo Não Pára"],
    alternativeArtists: ["Frejat", "Lulu Santos", "Nando Reis"],
    lyricsGap: {
      verseSnippet: "Exagerado, jogado aos teus pés, eu sou mesmo ___",
      correctWord: "exagerado",
      alternativeWords: ["apaixonado", "desesperado", "alucinado"]
    }
  },

  // --- SERTANEJO ---
  {
    id: "sert_01",
    videoId: "vI2j8H0_g90", // Marília Mendonça - Infiel
    title: "Infiel",
    artist: "Marília Mendonça",
    genre: "Sertanejo",
    startSeconds: 62,
    endSeconds: 75,
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
    videoId: "1eO7tG_p2hM", // Jorge & Mateus - Amo Noite e Dia
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
    videoId: "9oT2fR_x9e8", // Henrique & Juliano - Cuida Bem Dela
    title: "Cuida Bem Dela",
    artist: "Henrique & Juliano",
    genre: "Sertanejo",
    startSeconds: 55,
    endSeconds: 68,
    alternativeTitles: ["Até Você Voltar", "Liberdade Provisória", "Vidinha de Balada"],
    alternativeArtists: ["Gusttavo Lima", "Luan Santana", "Cristiano Araújo"],
    lyricsGap: {
      verseSnippet: "Cuida bem dela, você não vai conhecer alguém melhor que ___",
      correctWord: "ela",
      alternativeWords: ["você", "ninguém", "eu"]
    }
  },
  {
    id: "sert_04",
    videoId: "Z_27qZ6L5qU", // Evidências - Chitãozinho & Xororó
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
    videoId: "3aBwY5uG8mI", // Tim Maia - Não Quero Dinheiro
    title: "Não Quero Dinheiro (Só Quero Amar)",
    artist: "Tim Maia",
    genre: "MPB",
    startSeconds: 30,
    endSeconds: 43,
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
    videoId: "b6vW4hXqL9w", // Elis Regina - Como Nossos Pais
    title: "Como Nossos Pais",
    artist: "Elis Regina",
    genre: "MPB",
    startSeconds: 50,
    endSeconds: 63,
    alternativeTitles: ["Águas de Março", "O Bêbado e a Equilibrista", "Fascinação"],
    alternativeArtists: ["Gal Costa", "Maria Bethânia", "Rita Lee"],
    lyricsGap: {
      verseSnippet: "Ainda somos os mesmos e vivemos como nossos ___",
      correctWord: "pais",
      alternativeWords: ["irmãos", "antigos", "avós"]
    }
  },
  {
    id: "mpb_03",
    videoId: "9m_W6b_jL3s", // Jorge Ben Jor - Mas Que Nada
    title: "Mas Que Nada",
    artist: "Jorge Ben Jor",
    genre: "MPB",
    startSeconds: 22,
    endSeconds: 35,
    alternativeTitles: ["Taj Mahal", "País Tropical", "Chove Chuva"],
    alternativeArtists: ["Gilberto Gil", "Caetano Veloso", "Chico Buarque"],
    lyricsGap: {
      verseSnippet: "O samba tá animado, o que eu quero é ___",
      correctWord: "sambar",
      alternativeWords: ["dançar", "cantar", "pular"]
    }
  },

  // --- POP & FUNK BR ---
  {
    id: "pop_01",
    videoId: "c5gH6tF2kL8", // Anitta - Show das Poderosas
    title: "Show das Poderosas",
    artist: "Anitta",
    genre: "Funk / Pop",
    startSeconds: 20,
    endSeconds: 33,
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
    videoId: "8xL7yH1hK8o", // MC Kevinho - Olha a Explosão
    title: "Olha a Explosão",
    artist: "MC Kevinho",
    genre: "Funk / Pop",
    startSeconds: 35,
    endSeconds: 48,
    alternativeTitles: ["O Grave Bater", "Ta Tum Tum", "Agora É Tudo Meu"],
    alternativeArtists: ["MC Livinho", "MC Guimê", "MC Fioti"],
    lyricsGap: {
      verseSnippet: "Essa novinha é terrorista, é perita em quebrar a ___",
      correctWord: "cara",
      alternativeWords: ["mente", "pista", "regra"]
    }
  },
  {
    id: "pop_03",
    videoId: "hQfXj_yZk8M", // Ludmilla - Maldivas
    title: "Maldivas",
    artist: "Ludmilla",
    genre: "Funk / Pop",
    startSeconds: 45,
    endSeconds: 58,
    alternativeTitles: ["Cheguei", "Verdinha", "Rainha da Favela"],
    alternativeArtists: ["Gloria Groove", "Iza", "Pocah"],
    lyricsGap: {
      verseSnippet: "A minha de fé, a minha mulher, que me faz tão ___",
      correctWord: "bem",
      alternativeWords: ["feliz", "livre", "forte"]
    }
  },

  // --- TRAP & RAP NACIONAL ---
  {
    id: "rap_01",
    videoId: "j8N2mP7qL5w", // Matuê - Anos Luz
    title: "Anos Luz",
    artist: "Matuê",
    genre: "Trap / Rap",
    startSeconds: 30,
    endSeconds: 43,
    alternativeTitles: ["Kenny G", "777-666", "Máquina do Tempo"],
    alternativeArtists: ["Teto", "WIU", "Filipe Ret"],
    lyricsGap: {
      verseSnippet: "Baby, eu tô a anos luz daquele seu velho ___",
      correctWord: "mundo",
      alternativeWords: ["tempo", "amor", "sonho"]
    }
  },
  {
    id: "rap_02",
    videoId: "k5W3mQ9zT2e", // Racionais MC's - Vida Loka Parte 2
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

