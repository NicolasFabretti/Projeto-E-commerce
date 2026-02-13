não 👍 — não coloca caminho de página dentro do ID.
o ID deve continuar sendo só um identificador único do produto.

em e-commerce real o fluxo é assim:

produto.html?id=6


ou

/produto/6


ou seja:

👉 você passa o ID pela URL
👉 e a página do produto carrega os dados usando esse ID

🧠 como fazer no seu projeto (jeito certo)
🔗 1️⃣ quando clicar no card

você redireciona com o ID:

const card = event.target.closest('.card-produto')

if(card){
  const id = card.dataset.id

  window.location.href = `/produto.html?id=${id}`
}


isso abre:

produto.html?id=6

📄 2️⃣ dentro da página produto.html

você pega o ID da URL:

const params = new URLSearchParams(window.location.search)

const id = Number(params.get('id'))

console.log(id) // 6

🔍 3️⃣ procura o produto na lista
import { listaProdutos } from "../data/products.js"

const produto = listaProdutos.find(p => p.id === id)

console.log(produto)


💥 pronto — você tem o produto completo.

🧱 4️⃣ renderiza na página
document.querySelector('.titulo').textContent = produto.nome
document.querySelector('.preco').textContent = produto.preco
document.querySelector('.img').src = produto.imagem

🚫 o que NÃO fazer

❌ colocar caminho dentro do mock:

pagina: "/produto1.html"


isso quebra escalabilidade.

imagina:

1000 produtos
1000 páginas


💀 impossível manter.

🧠 padrão real de e-commerce

todos usam:

1 página dinâmica
+ id na url


Amazon:

amazon.com/dp/B0C123XYZ


Kabum:

kabum.com.br/produto/123456


MagazineLuiza:

magazineluiza.com.br/p/12345