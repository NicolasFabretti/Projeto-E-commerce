/*--------------------------- carrossel dos banners --------------------------- */
const carrosselBanners = document.querySelector('.allBanners');
const bannersImg = document.querySelectorAll('.allBanners img');
const backgroundImg = document.body;
const botaoDireita = document.querySelector('#botao-direita');
const botaoEsquerda = document.querySelector('#botao-esquerda');

let indexAtual = 0;
const totalBanners = bannersImg.length;


function atualizarSlide() {
  carrosselBanners.style.transform =
    `translateX(-${indexAtual * 100}%)`;

  const bannerAtual = bannersImg[indexAtual];
  const cor = bannerAtual.dataset.bg;

  if (cor) {
    document.body.style.backgroundColor = cor;
  }
}

function next() {
  indexAtual = (indexAtual + 1) % totalBanners;
  atualizarSlide();
}

function prev() {
  indexAtual =
    (indexAtual - 1 + totalBanners) % totalBanners;
  atualizarSlide();
}

let intervalo;

function iniciarAutoPlay() {
  intervalo = setInterval(next, 5000);
}

function resetarAutoPlay() {
  clearInterval(intervalo);
  iniciarAutoPlay();
}

botaoDireita.addEventListener('click', () => {
  next();
  resetarAutoPlay();
});

botaoEsquerda.addEventListener('click', () => {
  prev();
  resetarAutoPlay();
});

atualizarSlide();|
iniciarAutoPlay();

/*-------------------  Função para pegar hora + contagem regressiva ------------------- */
function iniciarRelogio() {
  const hora = document.querySelector('#hora');
  if (!hora) return;

  function mostrarHora() {
    const agora = new Date();
    const dataInicio = new Date("2026-01-23");

    const diasPassados = Math.floor(
      (agora - dataInicio) / (1000 * 60 * 60 * 24)
    );

    const diasRestantes = Math.max(10 - diasPassados, 0);

    const h = String(agora.getHours()).padStart(2, '0');
    const m = String(agora.getMinutes()).padStart(2, '0');
    const s = String(agora.getSeconds()).padStart(2, '0');

    hora.innerText = `${diasRestantes}D ${h}:${m}:${s}`;
  }

  mostrarHora();
  setInterval(mostrarHora, 1000);
}

iniciarRelogio();



/*--------------------------- carrossel dos produtos --------------------------- */
const grid = document.querySelector('.produtos-grid');
const btnPrev2 = document.querySelector('#btn-prev');
const btnNext2 = document.querySelector('#btn-next');

const scrollAmount2 = 277 + 7; //Largura do card + gap

btnPrev2.addEventListener('click', () => {
    grid.scrollBy({
        left:-scrollAmount2,
        behavior:"smooth"
    });
});

btnNext2.addEventListener('click', () => {
    grid.scrollBy({
        left:scrollAmount2,
        behavior:"smooth"
    });
});

