export function iniciarCarrosselBanners(){

  const carrossel = document.querySelector('.allBanners')
  const imgs = document.querySelectorAll('.allBanners img')
  const direita = document.querySelector('#botao-direita')
  const esquerda = document.querySelector('#botao-esquerda')

  if(!carrossel) return

  let index=0

  function atualizar(){
    carrossel.style.transform=`translateX(-${index*100}%)`
  }

  function next(){
    index=(index+1)%imgs.length
    atualizar()
  }

  function prev(){
    index=(index-1+imgs.length)%imgs.length
    atualizar()
  }

  direita?.addEventListener('click',next)
  esquerda?.addEventListener('click',prev)

  setInterval(next,3000)
}
