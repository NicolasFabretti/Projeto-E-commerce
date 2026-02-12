export function iniciarCarrosselProdutos(){

  const grid = document.querySelector('.produtos-grid')
  const prev = document.querySelector('#btn-prev')
  const next = document.querySelector('#btn-next')

  if(!grid) return

  const scroll=284

  prev?.addEventListener('click',()=>{
    grid.scrollBy({left:-scroll,behavior:"smooth"})
  })

  next?.addEventListener('click',()=>{
    grid.scrollBy({left:scroll,behavior:"smooth"})
  })
}
