import { listaProdutos } from "../data/products.js"
import { addToCart, toggleLike, isLiked } from "../services/cartService.js"
import { isLogged } from "../services/userService.js"
import { abrirModalLogin } from "../components/modalLogin.js"

function getProdutoId(){
  const url = new URLSearchParams(window.location.search)
  return Number(url.get('id'))
}

function renderProduto(){
  const id = getProdutoId()
  const produto = listaProdutos.find(p => p.id === id)
  
  if(!produto){
    document.body.innerHTML = '<p style="padding: 40px; text-align: center;">Produto não encontrado</p>'
    return
  }

  // breadcrumb
  document.getElementById('breadcrumb-nome').textContent = produto.nome

  // nome
  document.getElementById('nome-produto').textContent = produto.nome

  // imagem principal
  document.getElementById('img-principal').src = produto.imagem
  document.getElementById('img-principal').dataset.id = produto.id

  // galeria de imagens (usa mesma imagem repetida por simplicidade)
  const imgsContainer = document.getElementById('imgs-menores')
  for(let i = 0; i < 4; i++){
    const img = document.createElement('img')
    img.src = produto.imagem
    img.alt = `Imagem ${i+1}`
    img.className = i === 0 ? 'ativo' : ''
    img.addEventListener('click', () => {
      document.querySelectorAll('.imgs-menores img').forEach(el => el.classList.remove('ativo'))
      img.classList.add('ativo')
      document.getElementById('img-principal').src = img.src
    })
    imgsContainer.appendChild(img)
  }

  // preço
  document.getElementById('preco-antigo').textContent = `R$ ${produto.valorAntigo.toFixed(2)}`
  document.getElementById('preco-atual').textContent = `R$ ${produto.preco.toFixed(2)}`
  
  const parcela = Math.trunc((produto.preco / 10) * 100) / 100
  document.getElementById('parcelas').textContent = `ou até 10x de R$ ${parcela.toFixed(2)} no cartão`

  // especificações principais
  const specs = produto.especificacoes
  const especPrincipais = document.getElementById('specs-principais')
  if(specs){
    const campos = ['memoriaVram', 'barramento', 'rayTracing', 'dlss', 'tdp']
    campos.forEach(campo => {
      const spec = document.createElement('div')
      spec.className = 'spec-item'
      spec.innerHTML = `
        <div class="spec-label">${campo.replace(/([A-Z])/g, ' $1')}</div>
        <div class="spec-valor">${specs[campo] || 'N/A'}</div>
      `
      especPrincipais.appendChild(spec)
    })
  }

  // descrição
  document.getElementById('descricao-completa').textContent = produto.descricao || 'Descrição não disponível'

  // especificações completas
  const especCompletas = document.getElementById('specs-completas')
  if(specs){
    Object.entries(specs).forEach(([chave, valor]) => {
      const spec = document.createElement('div')
      spec.className = 'spec-item'
      spec.innerHTML = `
        <div class="spec-label">${chave.replace(/([A-Z])/g, ' $1')}</div>
        <div class="spec-valor">${valor}</div>
      `
      especCompletas.appendChild(spec)
    })
  }

  // botões
  setupBotoes(produto)
}

function setupBotoes(produto){
  // botão comprar
  const btnComprar = document.getElementById('btn-comprar-modal')
  btnComprar.addEventListener('click', () => {
    if(!isLogged()){ abrirModalLogin(); return }
    addToCart(produto.id)
    const msg = document.getElementById('msg-feedback')
    msg.textContent = '✓ Produto adicionado ao carrinho!'
    msg.style.display = 'block'
    setTimeout(() => msg.style.display = 'none', 2000)
  })

  // botão curtir
  const btnCurtir = document.getElementById('btn-curtir-produto')
  if(isLiked(produto.id)) btnCurtir.classList.add('liked')
  
  btnCurtir.addEventListener('click', () => {
    if(!isLogged()){ abrirModalLogin(); return }
    const liked = toggleLike(produto.id)
    btnCurtir.classList.toggle('liked', liked)
  })
}

renderProduto()
