export function iniciarCarrosselBanners(){

  //selecionando elementos.
  const carrosselBanners = document.querySelector('.allBanners')
  const bannersImg = document.querySelectorAll('.allBanners img')
  const botaoDireita = document.querySelector('#botao-direita')
  const botaoEsquerda = document.querySelector('#botao-esquerda')

  //se forem falsos, cancela a função. Evita erro.
  if(!carrosselBanners || !bannersImg.length) return

  //indice do slide atual.
  let indexAtual = 0

  //total banners existentes.
  const totalBanners = bannersImg.length

  function atualizarSlide(){

    // cria o loop do carrosel, e move ele para o lado.
    carrosselBanners.style.transform = `translateX(-${indexAtual * 100}%)`

    const bannerAtual = bannersImg[indexAtual]
    const cor = bannerAtual.dataset.bg

    if(cor){
      document.body.style.backgroundColor = cor
    }
  }

  function next(){
    indexAtual = (indexAtual + 1) % totalBanners
    atualizarSlide()
  }

  function prev(){
    indexAtual = (indexAtual - 1 + totalBanners) % totalBanners
    atualizarSlide()
  }

  let intervalo

  // AUTOPLAY
  function iniciarAutoPlay(){
    intervalo = setInterval(next,3000)
  }

  function resetarAutoPlay(){
    clearInterval(intervalo)
    iniciarAutoPlay()
  }

  // EVENTOS DOS BOTÕES
  botaoDireita?.addEventListener('click',()=>{ //o ?, é optional chaining, se existir executa, se não, ignora.
    next()
    resetarAutoPlay()
  })

  botaoEsquerda?.addEventListener('click',()=>{
    prev()
    resetarAutoPlay()
  })

  atualizarSlide()
  iniciarAutoPlay()
}
