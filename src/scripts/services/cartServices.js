/********* Função para criar cards *********/
import { listaProdutos } from "../data/products.js";

function criarCard(produto) {
  const card = document.createElement("article");
  card.classList.add("card-produto");
  card.dataset.id = produto.id;

  card.innerHTML = `
    <a href="#" class="card-link">
      <img src="${produto.imagem}" alt="${produto.nome}">
      
      <h3 class="produto-nome">${produto.nome}</h3>

      <div class="preco">
        <span class="preco-atual">
          R$ ${produto.preco.toFixed(2)}
        </span>
      </div>
    </a>

    <button class="btn-comprar" data-id="${produto.id}">
      COMPRAR
    </button>
  `;

  return card;
}

//Gerando o catalogo
const container = document.getElementById("lista-produtos");
listaProdutos.forEach(produto => {
    container.appendChild(criarCard(produto));
});

//event delegation:
container.addEventListener('click', (event) => {
    //clique no botão comprar
    if(event.target.classList.contains("btn-comprar")){
        const id = event.target.dataset.id;
        console.log("adicionar ao carrinho:", id);
    }

    //clique no card
    const card = event.target.closest(".card-link");
    if(card && !event.target.classList.contains("btn-comprar")) {
        console.log("Abrir pagica no produto", id);
    }
});