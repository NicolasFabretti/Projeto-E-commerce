import { listaProdutos } from "../data/products.js";
import { getCartDetails, getCart, changeQty, removeFromCart, clearCart } from "../services/cartService.js";

const container = document.getElementById('cart-list')
const totalEl = document.getElementById('cart-total')

function render(){
  const items = getCartDetails(listaProdutos)
  container.innerHTML = ''
  if(items.length === 0){
    container.innerHTML = '<p>Seu carrinho está vazio.</p>'
    totalEl.textContent = ''
    return
  }

  let total = 0
  items.forEach(item => {
    total += item.preco * item.qty
    const div = document.createElement('div')
    div.className = 'cart-item'
    div.innerHTML = `
      <img src="${item.imagem}" alt="${item.nome}">
      <div>
        <div>${item.nome}</div>
        <div>R$ ${item.preco.toFixed(2)}</div>
      </div>
      <div class="cart-actions">
        <input type="number" min="1" value="${item.qty}" data-id="${item.id}" style="width:64px">
        <button data-id="${item.id}" class="remove">Remover</button>
      </div>
    `
    container.appendChild(div)
  })

  totalEl.textContent = `Total: R$ ${total.toFixed(2)}`
}

container?.addEventListener('input', (e) => {
  const input = e.target.closest('input[type="number"]')
  if(!input) return
  const id = Number(input.dataset.id)
  const qty = Number(input.value)
  changeQty(id, qty)
  render()
})

container?.addEventListener('click', (e) => {
  const btn = e.target.closest('button.remove')
  if(!btn) return
  const id = Number(btn.dataset.id)
  removeFromCart(id)
  render()
})

// inicializa
render()
