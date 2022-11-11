// para inserir evento de click nos botões
const githubButton = document.querySelector('#github-button');
const linkedinButton = document.querySelector('#linkedin-button');
const rightButton = document.querySelector('#right-button');
const leftButton = document.querySelector('#left-button');

// para fazer a troca de conteudo
const panel = document.querySelector('#panel');
// para pegar o evento de cena carregada
const sceneEl = document.querySelector('a-scene');
// para controlar o video
const video = document.querySelector('#video');
// para parar o video se o target não for mais encontrado
const target = document.querySelector('#the-target');

// mindar engine
const arSystem = sceneEl.systems["mindar-image-system"];

video.pause();

githubButton.addEventListener('click', () => {
  window.open('https://github.com/annelivia', '_blank');
});

linkedinButton.addEventListener('click', () => {
  window.open('https://www.linkedin.com/in/annelivia/', '_blank');
});

// item inicial
let currentItem = 2;

panel.setAttribute('visible', true);

const showItem = (item) => {
  // vai deixar visivel o item atual e invisivel o restante
  for (let i = 0; i <= 2; i++) {
    document.querySelector('#item' + i).setAttribute('visible', i === item);
  }

  // é o vídeo, então precisa dar play, se não, pausa
  if (item === 0) {
    document.querySelector('#anchor-video').setAttribute('visible', true);
    video.play();
  } else {
    document.querySelector('#anchor-video').setAttribute('visible', false);
    video.pause();
  }
};

// botão para esquerda é clicado, então decrementa item atual e exibe
leftButton.addEventListener('click', () => {
  console.log(currentItem)
  currentItem -= 1;
  if (currentItem < 0) currentItem = 2;
  showItem(currentItem);
});

// botão para esquerda é clicado, então incrementa item atual e exibe
rightButton.addEventListener('click', () => {
  currentItem += 1;
  if (currentItem > 2) currentItem = 0;
  // console.log(currentItem)
  showItem(currentItem);
});

// arReady event triggered when ready
sceneEl.addEventListener("arReady", (event) => {
  console.log("MindAR is ready");
});
// arError event triggered when something went wrong. Mostly browser compatbility issue
sceneEl.addEventListener("arError", (event) => {
   console.log("MindAR failed to start")
});

target.addEventListener("targetFound", event => {
  if (currentItem === 0) {
    video.play()
  }
  console.log("Found")
});

target.addEventListener("targetLost", event => {
  // reiniciar o video, se retirar o target
  if (currentItem === 0) {
    video.pause()
    video.currentTime = 0
  }
 
  console.log("lost")
});

/*
window.addEventListener("orientationchange", function() {
  // Announce the new orientation number
  if(window.orientation === 90 || this.window.orientation === 0) {
    document.location.reload();
  }
}, false);*/