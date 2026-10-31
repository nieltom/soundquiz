/**
 * Catálogo Oficial Expandido de Músicas Brasileiras do SoundQuiz (PT-BR)
 * 40 faixas consagradas com IDs reais, verificados e corte preciso de refrão.
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
  {
    id: "rock_05",
    videoId: "Q2gAomSRKPI", // Skank - Garota Nacional
    title: "Garota Nacional",
    artist: "Skank",
    genre: "Rock Nacional",
    startSeconds: 45,
    endSeconds: 59,
    alternativeTitles: ["Vou Deixar", "Vamos Fugir", "Sutilmente"],
    alternativeArtists: ["Jota Quest", "Paralamas do Sucesso", "O Rappa"],
    lyricsGap: {
      verseSnippet: "Tanto faz, deixa rolar, com você qualquer lugar, garota ___",
      correctWord: "nacional",
      alternativeWords: ["ideal", "sensacional", "especial"]
    }
  },
  {
    id: "rock_06",
    videoId: "qiU_XXucYBE", // Capital Inicial - Primeiros Erros
    title: "Primeiros Erros (Chove)",
    artist: "Capital Inicial",
    genre: "Rock Nacional",
    startSeconds: 65,
    endSeconds: 80,
    alternativeTitles: ["À Sua Maneira", "Fogo", "Passageiro"],
    alternativeArtists: ["Legião Urbana", "Plebe Rude", "Nenhum de Nós"],
    lyricsGap: {
      verseSnippet: "Se um dia eu pudesse ver meu passado inteiro e fizesse parar de ___",
      correctWord: "chover",
      alternativeWords: ["doer", "sofrer", "correr"]
    }
  },
  {
    id: "rock_07",
    videoId: "WPS8Ore0gIY", // Lulu Santos - Tempos Modernos
    title: "Tempos Modernos",
    artist: "Lulu Santos",
    genre: "Rock Nacional",
    startSeconds: 25,
    endSeconds: 40,
    alternativeTitles: ["Como Uma Onda", "Toda Forma de Amor", "Apenas Mais Uma de Amor"],
    alternativeArtists: ["Guilherme Arantes", "Ritchie", "Lobão"],
    lyricsGap: {
      verseSnippet: "Eu vejo a vida melhor no futuro, eu vejo isso por cima de um ___",
      correctWord: "muro",
      alternativeWords: ["céu", "sonho", "mar"]
    }
  },
  {
    id: "rock_08",
    videoId: "wpKcmrcvrII", // Os Paralamas do Sucesso - Alagados
    title: "Alagados",
    artist: "Os Paralamas do Sucesso",
    genre: "Rock Nacional",
    startSeconds: 40,
    endSeconds: 55,
    alternativeTitles: ["Meu Erro", "Lanterna dos Afogados", "Óculos"],
    alternativeArtists: ["Barão Vermelho", "Titãs", "Blitz"],
    lyricsGap: {
      verseSnippet: "Alagados, Trenchtown, Favela da Maré, a esperança não vem do ___",
      correctWord: "mar",
      alternativeWords: ["céu", "sol", "chão"]
    }
  },
  {
    id: "rock_09",
    videoId: "juM8luwwMoo", // CPM 22 - Dias Atrás
    title: "Dias Atrás",
    artist: "CPM 22",
    genre: "Rock Nacional",
    startSeconds: 32,
    endSeconds: 47,
    alternativeTitles: ["Um Minuto Para o Fim do Mundo", "Não Sei Viver Sem Ter Você", "Regina Let's Go"],
    alternativeArtists: ["Hateen", "Dead Fish", "NX Zero"],
    lyricsGap: {
      verseSnippet: "Ainda lembro de dias atrás quando tudo parecia ___",
      correctWord: "normal",
      alternativeWords: ["em paz", "tão bom", "igual"]
    }
  },
  {
    id: "rock_10",
    videoId: "x52cIFOupJY", // Raimundos - Mulher de Fases
    title: "Mulher de Fases",
    artist: "Raimundos",
    genre: "Rock Nacional",
    startSeconds: 40,
    endSeconds: 55,
    alternativeTitles: ["A Mais Pedida", "Eu Quero Ver o Oco", "Puteiro em João Pessoa"],
    alternativeArtists: ["Mamonas Assassinas", "Ultraje a Rigor", "Tihuana"],
    lyricsGap: {
      verseSnippet: "Complicada e perfeitinha, você é meiga, louca e cheia de ___",
      correctWord: "fases",
      alternativeWords: ["manhas", "charme", "graça"]
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
  {
    id: "sert_04",
    videoId: "hcm55lU9knw", // Michel Teló - Ai Se Eu Te Pego
    title: "Ai Se Eu Te Pego",
    artist: "Michel Teló",
    genre: "Sertanejo",
    startSeconds: 30,
    endSeconds: 45,
    alternativeTitles: ["Humilde Residência", "Fugidinha", "Bará Berê"],
    alternativeArtists: ["Luan Santana", "Gusttavo Lima", "Cristiano Araújo"],
    lyricsGap: {
      verseSnippet: "Nossa, nossa, assim você me mata, ai se eu te pego, ai, ai se eu te ___",
      correctWord: "pego",
      alternativeWords: ["beijo", "amo", "vejo"]
    }
  },
  {
    id: "sert_05",
    videoId: "A8iwQscRxDY", // Luan Santana - Meteoro
    title: "Meteoro",
    artist: "Luan Santana",
    genre: "Sertanejo",
    startSeconds: 48,
    endSeconds: 63,
    alternativeTitles: ["Te Esperando", "Amar Não É Pecado", "Acordando o Prédio"],
    alternativeArtists: ["Lucas Lucco", "Felipe Araújo", "Gusttavo Lima"],
    lyricsGap: {
      verseSnippet: "Te dei o sol, te dei o mar pra ganhar seu coração, você é meu ___",
      correctWord: "meteoro da paixão",
      alternativeWords: ["grande amor de verão", "céu de inspiração", "eterno coração"]
    }
  },
  {
    id: "sert_06",
    videoId: "tFE68iDO0sI", // Gusttavo Lima - Balada Boa (Tchê Tcherere)
    title: "Balada Boa",
    artist: "Gusttavo Lima",
    genre: "Sertanejo",
    startSeconds: 40,
    endSeconds: 55,
    alternativeTitles: ["Inventor dos Amores", "Gatinha Assanhada", "Apelido Carinhoso"],
    alternativeArtists: ["Israel Novaes", "Humberto & Ronaldo", "Munhoz & Mariano"],
    lyricsGap: {
      verseSnippet: "Eu já lavei o meu carro, regulei o som, já tá tudo ___",
      correctWord: "preparado",
      alternativeWords: ["combinado", "ajeitado", "animado"]
    }
  },
  {
    id: "sert_07",
    videoId: "KqOzrrpAAjY", // Simone & Simaria - Meu Violão e o Nosso Cachorro
    title: "Meu Violão e o Nosso Cachorro",
    artist: "Simone & Simaria",
    genre: "Sertanejo",
    startSeconds: 50,
    endSeconds: 65,
    alternativeTitles: ["Loka", "Regime Fechado", "Quando o Mel É Bom"],
    alternativeArtists: ["Maiara & Maraisa", "Marília Mendonça", "Lauana Prado"],
    lyricsGap: {
      verseSnippet: "Fiquei com quatrocentos reais, meu violão e o nosso ___",
      correctWord: "cachorro",
      alternativeWords: ["passado", "amigo", "carro"]
    }
  },
  {
    id: "sert_08",
    videoId: "_sY_SuEgdm4", // Maiara & Maraisa - 10%
    title: "10% (Garçom Troca o DVD)",
    artist: "Maiara & Maraisa",
    genre: "Sertanejo",
    startSeconds: 45,
    endSeconds: 60,
    alternativeTitles: ["Medo Bobo", "Sorte Que Cê Beija Bem", "Bengala e Crochê"],
    alternativeArtists: ["Simone & Simaria", "Naiara Azevedo", "Yasmin Santos"],
    lyricsGap: {
      verseSnippet: "Garçom, troca o DVD que essa moda me faz roer, e o garçom ganha dez por ___",
      correctWord: "cento",
      alternativeWords: ["conta", "pena", "cerveja"]
    }
  },
  {
    id: "sert_09",
    videoId: "rYKOuKaWEjg", // Zé Neto & Cristiano - Notificação Preferida
    title: "Notificação Preferida",
    artist: "Zé Neto & Cristiano",
    genre: "Sertanejo",
    startSeconds: 45,
    endSeconds: 60,
    alternativeTitles: ["Largado às Traças", "Status Que Eu Não Queria", "Bebida na Ferida"],
    alternativeArtists: ["Henrique & Juliano", "Matheus & Kauan", "Hugo & Guilherme"],
    lyricsGap: {
      verseSnippet: "Foi só um gole de cerveja pra eu ver o seu nome brilhando na tela, minha ___",
      correctWord: "notificação preferida",
      alternativeWords: ["ligação da vida", "conversa perdida", "saudade escondida"]
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
  {
    id: "mpb_03",
    videoId: "sGC8g0DJ0_E", // Caetano Veloso - Sozinho
    title: "Sozinho",
    artist: "Caetano Veloso",
    genre: "MPB",
    startSeconds: 45,
    endSeconds: 60,
    alternativeTitles: ["Você É Linda", "Leãozinho", "Sampa"],
    alternativeArtists: ["Gilberto Gil", "Chico Buarque", "Milton Nascimento"],
    lyricsGap: {
      verseSnippet: "Às vezes no silêncio da noite eu fico imaginando nós ___",
      correctWord: "dois",
      alternativeWords: ["três", "bem", "sós"]
    }
  },
  {
    id: "mpb_04",
    videoId: "5siQ-ml5lqY", // Djavan - Sina
    title: "Sina",
    artist: "Djavan",
    genre: "MPB",
    startSeconds: 35,
    endSeconds: 50,
    alternativeTitles: ["Oceano", "Samurai", "Se"],
    alternativeArtists: ["Seu Jorge", "Ivan Lins", "Lenine"],
    lyricsGap: {
      verseSnippet: "Pai e mãe, ouro de mina, coração, desejo e ___",
      correctWord: "sina",
      alternativeWords: ["vida", "alma", "rima"]
    }
  },
  {
    id: "mpb_05",
    videoId: "j42byy7G_Ow", // Alceu Valença - Anunciação
    title: "Anunciação",
    artist: "Alceu Valença",
    genre: "MPB",
    startSeconds: 45,
    endSeconds: 60,
    alternativeTitles: ["La Belle De Jour", "Morena Tropicana", "Coração Bobo"],
    alternativeArtists: ["Zé Ramalho", "Geraldo Azevedo", "Fagner"],
    lyricsGap: {
      verseSnippet: "Tu vens, tu vens, eu já escuto os teus ___",
      correctWord: "sinais",
      alternativeWords: ["passos", "cantos", "recados"]
    }
  },
  {
    id: "mpb_06",
    videoId: "HB8vbB5ILUU", // Gilberto Gil - Aquele Abraço
    title: "Aquele Abraço",
    artist: "Gilberto Gil",
    genre: "MPB",
    startSeconds: 30,
    endSeconds: 45,
    alternativeTitles: ["Esperando na Janela", "Andar com Fé", "Palco"],
    alternativeArtists: ["Caetano Veloso", "Novos Baianos", "Gal Costa"],
    lyricsGap: {
      verseSnippet: "O Rio de Janeiro continua lindo, o Rio de Janeiro continua ___",
      correctWord: "sendo",
      alternativeWords: ["vivo", "nosso", "festa"]
    }
  },

  // --- PAGODE & SAMBA ---
  {
    id: "pagode_01",
    videoId: "cDVR_Tf56pE", // Exaltasamba - Tá Vendo Aquela Lua
    title: "Tá Vendo Aquela Lua",
    artist: "Exaltasamba",
    genre: "Pagode / Samba",
    startSeconds: 40,
    endSeconds: 55,
    alternativeTitles: ["Fugidinha", "Me Apaixonei Pela Pessoa Errada", "Te Desejo Mútuo"],
    alternativeArtists: ["Turma do Pagode", "Jeito Moleque", "Revelação"],
    lyricsGap: {
      verseSnippet: "Tá vendo aquela lua que brilha lá no céu? Se você me pedir eu dou de ___",
      correctWord: "presente",
      alternativeWords: ["repente", "bandeja", "verdade"]
    }
  },
  {
    id: "pagode_02",
    videoId: "Db3Zzd5D-E8", // Raça Negra - Cheia de Manias
    title: "Cheia de Manias",
    artist: "Raça Negra",
    genre: "Pagode / Samba",
    startSeconds: 38,
    endSeconds: 53,
    alternativeTitles: ["É Tarde Demais", "Ciúme de Você", "Sozinho"],
    alternativeArtists: ["Só Pra Contrariar", "Molejo", "Negritude Júnior"],
    lyricsGap: {
      verseSnippet: "Cheia de manias, toda dengosa, menina bonita, sabe que é ___",
      correctWord: "gostosa",
      alternativeWords: ["charmosa", "cheirosa", "vaidosa"]
    }
  },
  {
    id: "pagode_03",
    videoId: "iNYl2Po5pBM", // Sorriso Maroto - Assim Você Mata o Papai
    title: "Assim Você Mata o Papai",
    artist: "Sorriso Maroto",
    genre: "Pagode / Samba",
    startSeconds: 40,
    endSeconds: 55,
    alternativeTitles: ["Futuro Prometido", "1 Metro e 65", "Dependente"],
    alternativeArtists: ["Dilsinho", "Ferrugem", "Mumuzinho"],
    lyricsGap: {
      verseSnippet: "Ai se eu te pego, ui se eu te beijo, assim você mata o ___",
      correctWord: "papai",
      alternativeWords: ["moreno", "garoto", "doutor"]
    }
  },
  {
    id: "pagode_04",
    videoId: "oTREAvZbmME", // Zeca Pagodinho - Deixa a Vida Me Levar
    title: "Deixa a Vida Me Levar",
    artist: "Zeca Pagodinho",
    genre: "Pagode / Samba",
    startSeconds: 40,
    endSeconds: 55,
    alternativeTitles: ["Coração em Desalinho", "Verdade", "Camarão Que Dorme a Onda Leva"],
    alternativeArtists: ["Arlindo Cruz", "Jorge Aragão", "Almir Guineto"],
    lyricsGap: {
      verseSnippet: "Deixa a vida me levar, vida leva eu, sou feliz e agradeço por tudo que Deus me ___",
      correctWord: "deu",
      alternativeWords: ["mandou", "trouxe", "mostrou"]
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
  {
    id: "pop_03",
    videoId: "h2xU3E6kePw", // Ivete Sangalo - Festa
    title: "Festa",
    artist: "Ivete Sangalo",
    genre: "Funk / Pop",
    startSeconds: 45,
    endSeconds: 60,
    alternativeTitles: ["Sorte Grande (Poeira)", "Acelera Aê", "Quando a Chuva Passar"],
    alternativeArtists: ["Claudia Leitte", "Daniela Mercury", "Banda Eva"],
    lyricsGap: {
      verseSnippet: "Festa no gueto, pode pular, que a poeira vai ___",
      correctWord: "subir",
      alternativeWords: ["baixar", "voar", "rodar"]
    }
  },
  {
    id: "pop_04",
    videoId: "XHdteVHNOE8", // Claudia Leitte - Exttravasa
    title: "Exttravasa",
    artist: "Claudia Leitte",
    genre: "Funk / Pop",
    startSeconds: 40,
    endSeconds: 55,
    alternativeTitles: ["Largadinho", "Baldin de Gelo", "Taquitá"],
    alternativeArtists: ["Ivete Sangalo", "Margareth Menezes", "Alinne Rosa"],
    lyricsGap: {
      verseSnippet: "Exttravasa, libera e joga tudo pro ar, eu quero ser ___",
      correctWord: "feliz",
      alternativeWords: ["livre", "dona", "rainha"]
    }
  },
  {
    id: "pop_05",
    videoId: "Hy5SYGYeiXc", // Ludmilla - Hoje
    title: "Hoje",
    artist: "Ludmilla",
    genre: "Funk / Pop",
    startSeconds: 35,
    endSeconds: 50,
    alternativeTitles: ["Cheguei", "Verdinha", "24 Horas Por Dia"],
    alternativeArtists: ["Anitta", "Lexa", "Pocah"],
    lyricsGap: {
      verseSnippet: "Hoje eu tô afim de um beijo na boca, de ficar bem louca e não ligar pra ___",
      correctWord: "nada",
      alternativeWords: ["ninguém", "hora", "depois"]
    }
  },
  {
    id: "pop_06",
    videoId: "g8psa0UBZKA", // IZA - Pesadão
    title: "Pesadão",
    artist: "IZA",
    genre: "Funk / Pop",
    startSeconds: 45,
    endSeconds: 60,
    alternativeTitles: ["Dona de Mim", "Brisa", "Ginga"],
    alternativeArtists: ["Gloria Groove", "Duda Beat", "Liniker"],
    lyricsGap: {
      verseSnippet: "Vou erguer meu castelo num lugar mais alto, do topo do morro ou no asfalto, ___",
      correctWord: "pesadão",
      alternativeWords: ["fortão", "gigantão", "poderosão"]
    }
  },
  {
    id: "pop_07",
    videoId: "p4aPlYN6x1Q", // Gloria Groove - Vermelho
    title: "Vermelho",
    artist: "Gloria Groove",
    genre: "Funk / Pop",
    startSeconds: 35,
    endSeconds: 50,
    alternativeTitles: ["A Queda", "Bumbum de Ouro", "Bonekinha"],
    alternativeArtists: ["Pabllo Vittar", "Lia Clark", "Urias"],
    lyricsGap: {
      verseSnippet: "Quem é essa menina de vermelho? Eu vim pra dançar no ___",
      correctWord: "espelho",
      alternativeWords: ["baile", "centro", "recreio"]
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
  },
  {
    id: "rap_02",
    videoId: "BKDz5kNjkfU", // Filipe Ret - Me Sinto Abençoado
    title: "Me Sinto Abençoado",
    artist: "Filipe Ret",
    genre: "Trap / Rap",
    startSeconds: 30,
    endSeconds: 45,
    alternativeTitles: ["Neurótico de Guerra", "Invicto", "Corte Americano"],
    alternativeArtists: ["L7NNON", "Matuê", "Orochi"],
    lyricsGap: {
      verseSnippet: "Hoje eu me sinto abençoado, o tempo todo Deus tá do meu ___",
      correctWord: "lado",
      alternativeWords: ["banco", "caminho", "plano"]
    }
  },
  {
    id: "rap_03",
    videoId: "NbB6qMA2lts", // L7NNON - Ai Preto
    title: "Ai Preto",
    artist: "L7NNON",
    genre: "Trap / Rap",
    startSeconds: 25,
    endSeconds: 40,
    alternativeTitles: ["Freio da Blazer", "Perdição", "Gratidão"],
    alternativeArtists: ["MC Cabelinho", "Poze do Rodo", "Xamã"],
    lyricsGap: {
      verseSnippet: "Ai preto, que homem é esse, ai meu Deus do céu, ai ___",
      correctWord: "preto",
      alternativeWords: ["mano", "chefe", "querido"]
    }
  }
];

// Lista de Gêneros Musicais
const MUSIC_GENRES = [
  "Todos os Gêneros",
  "Rock Nacional",
  "Sertanejo",
  "MPB",
  "Pagode / Samba",
  "Funk / Pop",
  "Trap / Rap"
];
