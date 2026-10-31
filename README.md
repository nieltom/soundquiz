# 🎵 SoundQuiz Brasil 🇧🇷
### Quiz Musical Multiplayer em Tempo Real com Clássicos Brasileiros & Integração com YouTube

O **SoundQuiz Brasil** é um jogo musical competitivo e cooperativo inspirado na dinâmica consagrada do *SongPop*, *Bandle* e *Qual é a Música*. Foi desenvolvido com foco em **Mobile-First / PWA**, rodando direto no navegador em qualquer smartphone (Android e iPhone) ou computador, com zero instalação necessária.

---

## ⚡ Como Jogar Imediatamente (Com Som 100% Ativado)

### 🥇 Opção 1: Pelo Inicializador Automático (Recomendado)
1. Navegue até a pasta do projeto: `c:\Users\nielt\OneDrive\Desktop\MusicGame`.
2. Dê um **duplo clique no arquivo `iniciar.bat`**.
3. O jogo iniciará automaticamente em `http://localhost:8080` no seu navegador!
   * *Por que esta opção é recomendada?* O YouTube bloqueia reprodução com som quando uma página é aberta via `file:///` direto do disco rígido. Ao rodar pelo `iniciar.bat`, o jogo roda em um servidor local nativo do Windows (sem precisar instalar nada), liberando o áudio e os clipes do YouTube instantaneamente!

### 🥈 Opção 2: Abrindo direto o `index.html`
1. Se abrir direto com duplo clique no `index.html`, o jogo possui um **Sintetizador Web Audio API** e um botão **🔊 Ativar Som** no topo da tela de jogo para forçar a liberação do áudio pelo navegador caso o YouTube esteja em modo silencioso.

### 📱 Como instalar no Celular como Aplicativo (PWA):
1. Abra o jogo no navegador do seu smartphone.
2. Toque no menu do navegador (três pontinhos no Android / ícone de Compartilhar no Safari do iPhone).
3. Selecione **"Adicionar à Tela de Início"** ou **"Instalar Aplicativo"**.
4. O ícone do **SoundQuiz** aparecerá na tela do seu celular, abrindo em tela cheia idêntico a um app nativo!

---

## 🎮 Modos de Jogo e Dinâmicas

1. **👥 Todos vs Todos (FFA 4 Jogadores):** Disputa clássica entre 4 participantes. Quem acertar mais rápido acumula maior pontuação.
2. **⚡ Duelo 1v1 Rápido:** Partida direta de dois jogadores em alta intensidade.
3. **🤝 Batalha de Duplas (2v2):** Dupla A vs Dupla B. Os pontos de ambos os parceiros se somam para definir a vitória.
4. **👾 Modo Cooperativo (Co-op Boss - "Mestre do Vinil"):**
   * Todos os jogadores se unem contra o Chefe Musical (15.000 HP).
   * Cada acerto causa dano direto na barra de vida do Boss.
   * Respostas erradas ou tempo esgotado fazem o Boss contra-atacar!
5. **⚡ Rodada Bônus ("Velocidade Dobrada"):**
   * Na 7ª e última rodada, todos os pontos valem o **DOBRO (2x)**, gerando reviravoltas no placar final.

---

## 🎯 Tipos de Desafios por Rodada

Em cada rodada de 10 segundos, o jogo alterna dinamicamente entre 3 tipos de perguntas:
1. **Adivinhe o Nome da Música:** 4 títulos clássicos do gênero escolhido.
2. **Adivinhe o Artista/Banda:** 4 cantores ou bandas consagradas.
3. **Complete a Letra:** Um verso com lacuna (`___`) para escolher a palavra ou frase que continua a melodia.

---

## 🚀 Sistema de Pontuação Autoritativo

A pontuação recompensa rapidez e consistência:

$$\text{Pontos} = \Big[ 500_{\text{base}} + 500 \cdot \left(1 - \frac{t_{\text{resposta}}}{10\text{s}}\right) + \text{Bônus}_{\text{posição}} + (\text{Streak} \times 30) \Big] \cdot \text{Multiplicador}$$

* **1º a responder corretamente:** $+120$ pontos extras.
* **Sequência de acertos (Streak):** $+30$ pontos por acerto consecutivo.
* **Rodada Bônus:** Dobra o total obtido.

---

## 💥 Power-Ups e Gamificação

* **❌ -2 Erros:** Elimina 2 alternativas incorretas instantaneamente.
* **❄️ Congelar:** Aplica efeito de gelo e atrasa os oponentes em 1.5 segundo.
* **💡 Dica de Letra:** Revela as letras iniciais da resposta correta.
* **🪙 Moedas e Loja de Avatares:** Vencer partidas e marcar pontos rende moedas para desbloquear mais de 12 avatares musicais (Guitarras, Microfones, Saxofones, Coroas).
* **🏆 Patentes:** Evolução de Bronze até **Mestre do Som (Ouro Supremo)**.

---

## 🎧 Catálogo de Músicas & Como Adicionar Novas Faixas

O catálogo fica centralizado no arquivo [`js/tracks.js`](file:///c:/Users/nielt/OneDrive/Desktop/MusicGame/js/tracks.js). 

Para adicionar uma nova música, basta incluir um novo bloco no formato:
```javascript
{
  id: "sua_musica_01",
  videoId: "ID_DO_VIDEO_DO_YOUTUBE", // Código de 11 caracteres do link do YouTube
  title: "Nome da Música",
  artist: "Nome do Artista",
  genre: "Rock Nacional", // Gênero
  startSeconds: 45, // Segundo exato onde começa o refrão
  endSeconds: 58,   // Segundo onde termina o trecho
  alternativeTitles: ["Opção Errada 1", "Opção Errada 2", "Opção Errada 3"],
  alternativeArtists: ["Artista 1", "Artista 2", "Artista 3"],
  lyricsGap: {
    verseSnippet: "Trecho do verso com lacuna ___",
    correctWord: "continuação correta",
    alternativeWords: ["errada 1", "errada 2", "errada 3"]
  }
}
```

---

## 🌐 Servidor Online (Node.js & Socket.io)

Se você desejar hospedar a sala para que amigos entrem em tempo real pela internet:
1. Abra um terminal na pasta `server`.
2. Instale as dependências:
   ```bash
   npm install
   ```
3. Inicie o servidor:
   ```bash
   npm start
   ```
4. O servidor subirá em `http://localhost:3000` servindo o jogo completo.
5. Para hospedar gratuitamente na nuvem, você pode subir esta pasta `server` no [Render.com](https://render.com), [Railway.app](https://railway.app) ou [Glitch.com](https://glitch.com).

---

## ♿ Acessibilidade e Recursos Sociais

* **Modo Alto Contraste:** Suporte a pessoas com baixa visão e daltonismo, ativável no rodapé ou no menu de configurações.
* **Link para WhatsApp com 1 Clique:** Criação de salas privadas via código de 4 dígitos (ex: `BR42`) com link direto pronto para enviar aos amigos.
* **Reações em Tempo Real:** Envio de emojis animados que flutuam na tela de todos os participantes durante a partida.

