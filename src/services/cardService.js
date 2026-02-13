/********* Função para criar cards *********/
import { listaProdutos } from "../data/products.js";

export function criarCard(produto) {
  const card = document.createElement("article");
  card.classList.add("card-produto");
  card.dataset.id = produto.id;
  const parcela = Math.trunc((produto.preco / 10) * 100) / 100;
  card.innerHTML = `
    <a href="#" class="card-link">
      <div class="acoes-produto">
        <button class="btn-curtir">❤</button>
        <button class="btn-carrinho">🛒</button>
      </div>
      <div class="div-img-produto">
        <img src="${produto.imagem}" alt="${produto.nome}">
      </div>
  
      <h3 class="produto-nome">${produto.nome}</h3>
      <p class="valor-antigo">R$: ${produto.valorAntigo}</p>

      <div class="preco">
        <span class="preco-atual">
          <strong>R$: ${produto.preco.toFixed(2)}</strong>      
        </span>
      </div>

      <p class="info-pagamento">
        À vista no PIX <br>
        ou até 10x de ${parcela.toFixed(2)}
      </p>

    </a>

    <button class="btn-comprar" data-id="${produto.id}">
      COMPRAR
    </button>
  `;
  
  const acoesProduto = card.querySelector('.acoes-produto')
  const acoesBotoes = acoesProduto.querySelectorAll('button')
  // opcional: começar com os botões desabilitados    
  acoesBotoes.forEach(b => b.disabled = true)

  card.addEventListener('mouseenter', () => {
    acoesBotoes.forEach(b => b.disabled = false)

  })

  card.addEventListener('mouseleave', () => {
    acoesBotoes.forEach(b => b.disabled = true)
  })

  return card;
}
