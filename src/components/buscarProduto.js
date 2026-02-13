import { listaProdutos } from "../data/products.js";

function debounce(fn, wait = 200){
    let t
    return (...args) => {
        clearTimeout(t)
        t = setTimeout(() => fn(...args), wait)
    }
}

function criarContainer(){
    let container = document.getElementById('resultados-busca')
    if(container) return container
    container = document.createElement('div')
    container.id = 'resultados-busca'
    Object.assign(container.style, {
        position: 'absolute',
        background: '#fff',
        border: '1px solid #eee',
        boxShadow: '0 6px 18px rgba(0,0,0,0.08)',
        maxHeight: '320px',
        overflowY: 'auto',
        zIndex: 9999,
        display: 'none',
        borderRadius: '6px'
    })
    document.body.appendChild(container)
    return container
}

function positionContainer(container, input){
    const rect = input.getBoundingClientRect()
    container.style.left = rect.left + 'px'
    container.style.top = (rect.bottom + window.scrollY) + 'px'
    container.style.width = rect.width + 'px'
}

function renderResultados(container, resultados){
    if(!resultados || resultados.length === 0){
        container.innerHTML = `<div style="padding:12px;color:#666">Nenhum produto encontrado</div>`
        container.style.display = 'block'
        return
    }
    container.innerHTML = resultados.map(p => `
        <div class="res-item" data-id="${p.id}" style="padding:10px 12px;cursor:pointer;border-bottom:1px solid #f1f1f1">
            <div style="font-weight:600;color:#222">${p.nome}</div>
            <div style="font-size:13px;color:#666">R$ ${p.preco.toFixed(2)}</div>
        </div>
    `).join('')
    container.style.display = 'block'
}

export function iniciarBusca(){
    const pesquisa = document.querySelector('#pesquisa')
    if(!pesquisa) return
    const input = pesquisa.querySelector('input')
    const lupa = pesquisa.querySelector('img')
    if(!input) return

    const container = criarContainer()

    function buscarTermo(q){
        const termo = (q || '').trim().toLowerCase()
        if(!termo){
            container.style.display = 'none'
            return
        }
        const resultados = listaProdutos.filter(p => {
            return (p.nome && p.nome.toLowerCase().includes(termo)) ||
                         (p.descricao && p.descricao.toLowerCase().includes(termo)) ||
                         (p.categoria && p.categoria.toLowerCase().includes(termo))
        })
        renderResultados(container, resultados.slice(0, 20))
        positionContainer(container, input)
    }

    const debounced = debounce((e) => buscarTermo(e.target.value), 220)
    input.addEventListener('input', debounced)
    input.addEventListener('focus', (e) => { if(input.value) buscarTermo(input.value) })
    input.addEventListener('keypress', (e) => { if(e.key === 'Enter') buscarTermo(input.value) })
    lupa?.addEventListener('click', () => buscarTermo(input.value))

    // clique em resultado
    container.addEventListener('click', (e) => {
        const item = e.target.closest('.res-item')
        if(!item) return
        const id = item.dataset.id
        window.location.href = `pages/produto.html?id=${id}`
    })

    // esconder ao clicar fora
    window.addEventListener('click', (e) => {
        if(e.target === input || pesquisa.contains(e.target) || container.contains(e.target)) return
        container.style.display = 'none'
    })

    // reposicionar ao redimensionar/rolar
    window.addEventListener('resize', () => positionContainer(container, input))
    window.addEventListener('scroll', () => positionContainer(container, input))
}

// auto-iniciar se o DOM já estiver carregado (compatível com uso direto)
if(document.readyState === 'complete' || document.readyState === 'interactive'){
    setTimeout(() => {
        try{ iniciarBusca() }catch(e){}
    },0)
}