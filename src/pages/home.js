import { iniciarModalCep }
from '../components/modalCep.js'

import {iniciarModalLogin}
from '../components/modalLogin.js'

import { iniciarCarrosselBanners }
from '../components/carroselBanners.js'

import { iniciarCarrosselProdutos, iniciarCarrosselProdutos2,iniciarCarrosselProdutos3 }
from '../components/carrosselProdutos.js'

import { iniciarRelogio }
from '../components/relogio.js'

import { carregarEnderecoSalvo }
from '../utils/storage.js'

import { listaProdutos } from '../data/products.js'

import { iniciarBusca } from '../components/buscarProduto.js'

function setupDepartamentos(){
  const btnDept = document.querySelector('#departamentos')
  if(!btnDept) return
  
  btnDept.addEventListener('click', (e) => {
    e.preventDefault()
    alert('Departamentos disponíveis:\n\n✓ Placas de Vídeo\n- RTX Série 20\n- RTX Série 30\n- RTX Série 40\n- RTX Série 50\n\nEm breve: mais categorias!')
  })
}

function setupCupons(){
  const btnCupons = document.querySelector('#cupons')
  if(!btnCupons) return
  
  btnCupons.addEventListener('click', (e) => {
    e.preventDefault()
    const cupons = [
      { codigo: 'PRIMEIRACOMPRA10', desconto: '10% off' },
      { codigo: 'VIDEONOVA15', desconto: '15% off' },
      { codigo: 'FRETE5', desconto: '5% off no frete' }
    ]
    let msg = 'Cupons disponíveis:\n\n'
    cupons.forEach(c => msg += `${c.codigo} - ${c.desconto}\n`)
    alert(msg)
  })
}

function setupMaisVendidos(){
  const btnMais = document.querySelector('#mais-vendidos')
  if(!btnMais) return
  
  btnMais.addEventListener('click', (e) => {
    e.preventDefault()
    // Simular ordenação por venda (em ordem decrescente de preço como simulação)
    const maisVendidos = listaProdutos
      .sort((a, b) => b.preco - a.preco)
      .slice(0, 5)
      .map(p => p.nome)
      .join('\n\n')
    alert('Produtos mais vendidos:\n\n' + maisVendidos)
  })
}

function setupBlog(){
  const btnBlog = document.querySelector('#blog-kabum')
  if(!btnBlog) return
  
  btnBlog.addEventListener('click', (e) => {
    e.preventDefault()
    alert('Blog ainda em desenvolvimento!\n\nEm breve: dicas de hardware, reviews e notícias do mercado de placas gráficas.')
  })
}

function setupMontePc(){
  const imgMonte = document.querySelector('#monte-seu-pc')
  if(!imgMonte) return
  
  imgMonte.style.cursor = 'pointer'
  imgMonte.addEventListener('click', () => {
    alert('Construtor de PC disponível em breve!\n\nCombine processa e, placa-mãe, cooler e mais para montar seu PC perfeito.')
  })
}

function setupBanners(){
  const banners = document.querySelectorAll('.banners-retangulares a')
  banners.forEach(banner => {
    banner.addEventListener('click', (e) => {
      e.preventDefault()
      alert('Promoção especial em breve!')
    })
  })
}

function setupPesquisa(){
  const pesquisaInput = document.querySelector('#pesquisa input')
  const pesquisaImg = document.querySelector('#pesquisa img')
  if(!pesquisaInput) return
  
  function buscar(){
    const termo = pesquisaInput.value.trim()
    if(!termo){
      alert('Digite um termo para buscar!')
      return
    }
    const resultados = listaProdutos.filter(p => 
      p.nome.toLowerCase().includes(termo.toLowerCase())
    )
    if(resultados.length === 0){
      alert(`Nenhum produto encontrado para: "${termo}"`)
    } else {
      alert(`${resultados.length} produto(s) encontrado(s):\n\n${resultados.map(p => p.nome).join('\n')}`)
    }
  }
  
  pesquisaImg?.addEventListener('click', buscar)
  pesquisaInput.addEventListener('keypress', (e) => {
    if(e.key === 'Enter') buscar()
  })
}

function setupHeaderIcons(){
  const support = document.querySelector('#items-header a:nth-child(1)')
  const ergonomic = document.querySelector('#items-header a:nth-child(2)')
  
  if(support){
    support.addEventListener('click', (e) => {
      e.preventDefault()
      alert('Suporte ao Cliente:\n\n📞 Telefone: (11) 3456-7890\n📧 Email: suporte@genericname.com\n💬 Chat: disponível 24/7')
    })
  }
  
  if(ergonomic){
    ergonomic.addEventListener('click', (e) => {
      e.preventDefault()
      alert('Dicas de Ergonomia:\n\n✓ Mantenha monitores na altura dos olhos\n✓ Coloque-os a 50-70cm de distância\n✓ Use uma placa recente para melhor experiência')
    })
  }
}

function setupFooterLinks(){
  // Links do footer
  const footerLinks = document.querySelectorAll('.footer-inf a, .institucional a')
  footerLinks.forEach(link => {
    link.addEventListener('click', (e) => {
      e.preventDefault()
      const texto = link.textContent.trim()
      alert(`${texto}\n\nPágina em desenvolvimento!`)
    })
  })
  
  // Botões do footer
  const footerBtns = document.querySelectorAll('.footer-inf button, .footer-receba-ofertas button')
  footerBtns.forEach(btn => {
    if(btn.textContent.includes('Fale')) {
      btn.addEventListener('click', (e) => {
        e.preventDefault()
        alert('Chat de suporte abrindo...\n\nDisponível das 08:00 às 20:00')
      })
    } else if(btn.textContent.includes('Cadastrar')) {
      btn.addEventListener('click', (e) => {
        e.preventDefault()
        const nome = document.querySelector('.footer-receba-ofertas input[type="text"]')?.value || ''
        const email = document.querySelector('.footer-receba-ofertas input[type="email"]')?.value || ''
        if(!nome || !email){
          alert('Preencha seu nome e email!')
          return
        }
        alert(`✓ Obrigado, ${nome}!\nVocê receberá nossas ofertas em ${email}`)
      })
    }
  })
}

export function iniciarHome(){
  iniciarModalCep()
  carregarEnderecoSalvo()
  iniciarModalLogin()
  iniciarCarrosselBanners()
  iniciarCarrosselProdutos()
  iniciarCarrosselProdutos2()
  iniciarCarrosselProdutos3()
  iniciarRelogio()
  
  // Setup de todos os eventos adicionais
  setupDepartamentos()
  setupCupons()
  setupMaisVendidos()
  setupBlog()
  setupMontePc()
  setupBanners()
  iniciarBusca()
  setupHeaderIcons()
  setupFooterLinks()
}
