/* --------------------------- CEP MODAL --------------------------- */
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
        <input class="campo-cep" type="text" placeholder="Digite seu CEP*">
        <button class="btnOk">OK</button>
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

  var cep = modal.querySelector('.campo-cep')
  var btnOk = modal.querySelector('.btnOk')
  var alterarFrase = document.querySelector('.underline')

async function buscarCep(valorCep){

  const cepLimpo = valorCep.replace(/\D/g,'')

  if(cepLimpo.length !== 8){
    alert('CEP inválido')
    return
  }

  try{
    btnOk.textContent = 'Buscando...'
    btnOk.disabled = true

    const url = `https://viacep.com.br/ws/${cepLimpo}/json/`
    const resposta = await fetch(url)
    const data = await resposta.json()

    if(data.erro){
      alert('CEP não encontrado')
      return
    }

    alterarFrase.textContent =
    `${data.logradouro}, ${data.bairro}. ${data.localidade}/${data.uf}`

    localStorage.setItem('cepUsuario', JSON.stringify(data))



  }catch(error){
    alert('Erro ao buscar CEP')
  }finally{
    btnOk.textContent = 'OK'
    btnOk.disabled = false
  }
}

alterarFrase.classList.add('frase-logradouro')

btnOk.addEventListener('click', () => {
  buscarCep(cep.value)
})
});

function carregarEnderecoSalvo(){

  const alterarFrase = document.querySelector('.underline')

  if(!alterarFrase) return

  const enderecoSalvo =
    JSON.parse(localStorage.getItem('cepUsuario'))

  if(enderecoSalvo){
    alterarFrase.textContent =
      `${enderecoSalvo.logradouro},
       ${enderecoSalvo.bairro}.
       ${enderecoSalvo.localidade}/${enderecoSalvo.uf}`

    alterarFrase.classList.add('frase-logradouro')
  }
}
carregarEnderecoSalvo()



/*--------------------------- LOGIN ---------------------------*/

  const divLogin = document.querySelector('#login')
  const criarDropdown = document.createElement('section')

  divLogin.addEventListener('click',() => {
    document.body.appendChild(criarDropdown)
    criarDropdown.innerHTML = `
    <section class="dropDown">
      <div>
        <span>Acesse sua conta ou cadastre-se</span>
      </div>

      <div style="display:flex; justify-content: space-between; gap:10px; padding: 10px 0px 7px 0px;">
        <input style="width:100%; padding: 10px; border-radius: 5px; border: 1px solid #000000a6" type="text" placeholder="E-mail ou CPF">

        <button style="width:120px;padding:15px 10px; border-radius: 5px; border: none; color: #FFF; background-color: #a3a3a3; cursor:pointer; font-weight: bold";>ENTRAR</button>
      </div>

      <span>ou acessar com redes sociais</span>
      <img style="width:700px;height:150px; margin: 10px auto;" src="/assets/images/Banners/banner retangular/SuperDescontos.webp"
    </section>
    `
    criarDropdown.addEventListener('click', e => e.stopPropagation());
    document.body.classList.add('modal-open')

    
    function fecharLogin() {
      criarDropdown.remove();
      window.removeEventListener('click', fecharLogin);
      document.body.classList.remove('modal-open')
    }

    setTimeout(() => {
      window.addEventListener('click', fecharLogin);
    }, 0);
  })




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