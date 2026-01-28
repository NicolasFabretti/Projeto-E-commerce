/*********  Função para pegar hora + contagem regressiva *********/
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

/*--------------------------- botao da vitrine dos banners --------------------------- */
const divBanners = document.querySelector('.vitrine-banners')
const btnPrev1 = document.querySelector('#botao-esquerda');
const btnNext1 = document.querySelector('#botao-direita');



/*--------------------------- botao da vitrine dos produtos --------------------------- */
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


/*---------------------------vitrine dos banners --------------------------- */
import { bannersLista } from "../data/banners.js";

const bannerImg = document.querySelector("#banner-inicial"); //selecionando o banner no HTML
const body = document.body; //selecionando a cor do body

//variaveis de controle
let indexAtual = 0; //0 → primeiro banner da lista, guarda qual banner está ativo.
let emTransicao = false; //Evita que o banner mude no meio da animação. “Ei, espera terminar a troca antes de começar outra”

// preload
bannersLista.forEach(banner => {
  const img = new Image();
  img.src = banner.imagem;
});

/*O que acontece:
- Cria imagens invisíveis na memória
- Força o navegador a baixar tudo antes
- Evita aquele efeito feio de “imagem piscando”
📌 Sem isso:
- Banner pode ficar branco
- Transição fica feia */


function renderBanner() {
  if (emTransicao) return;
  emTransicao = true;

  const banner = bannersLista[indexAtual];
  bannerImg.style.opacity = 0;

  const novaImagem = new Image();
  novaImagem.src = banner.imagem;

  novaImagem.onload = () => {
    bannerImg.src = banner.imagem;
    bannerImg.style.opacity = 1;
    body.style.backgroundColor = banner.corFundo;
    emTransicao = false;
  };
}

renderBanner();

setInterval(() => {
  indexAtual = (indexAtual + 1) % bannersLista.length;
  renderBanner();
}, 2000);
