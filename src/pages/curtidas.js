import { listaProdutos } from "../data/products.js";
import { getLikes, toggleLike, addToCart } from "../services/cartService.js";
import { isLogged } from "../services/userService.js";
import { abrirModalLogin } from "../components/modalLogin.js";

const container = document.getElementById('likes-list')

function render(){
  const likes = getLikes()
  container.innerHTML = ''
  if(likes.length === 0){
    container.innerHTML = '<p>Você ainda não curtiu nenhum produto.</p>'
    return
  }

  likes.forEach(id => {
    const produto = listaProdutos.find(p => p.id === id)
    if(!produto) return

    const div = document.createElement('div')
    div.className = 'like-item'
    div.dataset.id = produto.id
    div.innerHTML = `
      <img src="${produto.imagem}" alt="${produto.nome}">
      <div>
        <div>${produto.nome}</div>
        <div>R$ ${produto.preco.toFixed(2)}</div>
      </div>
      <div class="like-actions">
        <button class="add-cart" data-id="${produto.id}">Adicionar ao carrinho</button>
        <button class="remove-like" data-id="${produto.id}">Remover</button>
      </div>
    `
    container.appendChild(div)
  })
}

container?.addEventListener('click', (e) => {
  const addBtn = e.target.closest('button.add-cart')
  if(addBtn){
    if(!isLogged()){ abrirModalLogin(); return }
    const id = Number(addBtn.dataset.id)
    addToCart(id)
    addBtn.textContent = 'Adicionado'
    addBtn.disabled = true
    return
  }

  const remBtn = e.target.closest('button.remove-like')
  if(remBtn){
    const id = Number(remBtn.dataset.id)
    toggleLike(id)
    render()
    return
  }
})

render()
