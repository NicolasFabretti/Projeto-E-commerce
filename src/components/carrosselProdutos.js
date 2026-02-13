import { listaProdutos } from "../data/products.js";
import { criarCard } from "../services/cardService.js";
import { addToCart, toggleLike, isLiked, getCart } from "../services/cartService.js";
import { isLogged } from "../services/userService.js";
import { abrirModalLogin } from "./modalLogin.js";

export function iniciarCarrosselProdutos(){
  iniciarCarrossel('#lista-produtos', '#btn-prev', '#btn-next');
  iniciarCatalogoProdutos('#lista-produtos');
}

export function iniciarCarrosselProdutos2(){
  iniciarCarrossel('#lista-produtos-2', '#btn-prev-2', '#btn-next-2');
  iniciarCatalogoProdutos('#lista-produtos-2');
}

export function iniciarCarrosselProdutos3(){
  iniciarCarrossel('#lista-produtos-3', '#btn-prev-3', '#btn-next-3');
  iniciarCatalogoProdutos('#lista-produtos-3')
}

function iniciarCarrossel(gridSelector, btnPrevSelector, btnNextSelector){
  const grid = document.querySelector(gridSelector);
  const btnPrev = document.querySelector(btnPrevSelector);
  const btnNext = document.querySelector(btnNextSelector);

  if(!grid || !btnPrev || !btnNext) return;

  const scrollAmount = 284;                     

  btnPrev.addEventListener('click', () => {
    grid.scrollBy({ left: -scrollAmount, behavior: "smooth" });
  });

  btnNext.addEventListener('click', () => {
    grid.scrollBy({ left: scrollAmount, behavior: "smooth" });
  });
}

function iniciarCatalogoProdutos(containerId){

  const container = document.querySelector(containerId)

  if(!container) return

  listaProdutos.forEach(produto => {
    const card = criarCard(produto)
    container.appendChild(card)
    // ajustar estado inicial dos botões (curtir / carrinho)
    const btnCurtir = card.querySelector('.btn-curtir')
    const btnCarrinho = card.querySelector('.btn-carrinho')
    if(btnCurtir) btnCurtir.classList.toggle('liked', isLiked(produto.id))
    const inCart = getCart().some(i => i.id === produto.id)
    if(btnCarrinho) btnCarrinho.classList.toggle('in-cart', inCart)
  })

  container.addEventListener('click', (event) => {
    const botaoComprar = event.target.closest('.btn-comprar')
    const botaoCarrinho = event.target.closest('.btn-carrinho')
    const botaoCurtir = event.target.closest('.btn-curtir')

    if(botaoComprar){
      if(!isLogged()){ abrirModalLogin(); return }
      const id = Number(botaoComprar.dataset.id)
      addToCart(id)
      console.log('adicionado ao carrinho:', id)
      const btn = botaoComprar.closest('.card-produto').querySelector('.btn-carrinho')
      if(btn) btn.classList.add('in-cart')
      return
    }

    if(botaoCarrinho){
      if(!isLogged()){ abrirModalLogin(); return }
      const id = Number(botaoCarrinho.closest('.card-produto').dataset.id)
      addToCart(id)
      botaoCarrinho.classList.add('in-cart')
      console.log('adicionado ao carrinho (ícone):', id)
      return
    }

    if(botaoCurtir){
      if(!isLogged()){ abrirModalLogin(); return }
      const id = Number(botaoCurtir.closest('.card-produto').dataset.id)
      const liked = toggleLike(id)
      botaoCurtir.classList.toggle('liked', liked)
      console.log('curtir toggled', id, liked)
      return
    }

    const card = event.target.closest('.card-link')
    if(card && !event.target.closest('.btn-comprar')){
      const id = Number(card.closest('.card-produto').dataset.id)
      window.location.href = `pages/produto.html?id=${id}`
    }
  })
}


