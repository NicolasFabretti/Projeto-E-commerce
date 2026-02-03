/* ========================= CEP MODAL ========================= */
const divCep = document.querySelector('#CEP');

divCep.addEventListener('click', (e) => {
  e.stopPropagation();

  const modal = document.createElement('section');
  const overlay = document.createElement('div');

  overlay.innerHTML = `<div class="ponta-cep"></div>`;

  modal.innerHTML = `
    <div class="click-cep">
      <span style="font-weight: 500;">
        Informe onde quer receber suas compras
        <hr>
      </span>

      <span style="margin:2px 0px 8px 0px;line-height: 1.2;">
        Digite seu Cep para consultar os custos e prazos de <br>
        entregas para sua região.
      </span>

      <div class="input-modal">
        <input type="text" placeholder="Digite seu CEP*">
        <button>OK</button>
      </div>
    </div>
  `;

  document.body.appendChild(overlay);
  document.body.appendChild(modal);

  modal.addEventListener('click', e => e.stopPropagation());

  function fecharModal() {
    modal.remove();
    overlay.remove();
    window.removeEventListener('click', fecharModal);
  }

  setTimeout(() => {
    window.addEventListener('click', fecharModal);
  }, 0);
});

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
  intervalo = setInterval(next, 3000);
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

atualizarSlide();
iniciarAutoPlay();

/* ========================= RELÓGIO ========================= */
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

/* ========================= CARROSSEL PRODUTOS ========================= */
const grid = document.querySelector('.produtos-grid');
const btnPrev = document.querySelector('#btn-prev');
const btnNext = document.querySelector('#btn-next');

const scrollAmount = 284;

btnPrev.addEventListener('click', () => {
  grid.scrollBy({ left: -scrollAmount, behavior: "smooth" });
});

btnNext.addEventListener('click', () => {
  grid.scrollBy({ left: scrollAmount, behavior: "smooth" });
});