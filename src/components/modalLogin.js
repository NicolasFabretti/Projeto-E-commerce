import { register, login, getUser, isLogged, logout } from '../services/userService.js'

function buildDropdown(){
  const criarDropdown = document.createElement('section')
  criarDropdown.className = 'dropDown'
  criarDropdown.innerHTML = `
    <div>
      <h3>Acesse sua conta ou cadastre-se</h3>
    </div>
    <div style="padding:10px 0; display:flex; gap:8px; flex-direction:column;">
      <input id="ml-nome" placeholder="Nome" style="padding:8px;border-radius:4px;border:1px solid #ccc">
      <input id="ml-email" placeholder="E-mail" style="padding:8px;border-radius:4px;border:1px solid #ccc">
      <input id="ml-senha" placeholder="Senha" type="password" style="padding:8px;border-radius:4px;border:1px solid #ccc">
      <div style="display:flex;gap:8px;margin-top:6px">
        <button id="ml-entrar" style="flex:1;padding:10px;background:#ff6500;border:none;color:#fff;border-radius:5px;">Entrar</button>
        <button id="ml-cadastrar" style="flex:1;padding:10px;background:#0066cc;border:none;color:#fff;border-radius:5px;">Cadastrar</button>
      </div>
      <div id="ml-feedback" style="color:crimson;margin-top:6px"></div>
    </div>
  `
  return criarDropdown
}

export function abrirModalLogin(){
  const existing = document.querySelector('.dropDown')
  if(existing) return
  const drop = buildDropdown()
  document.body.appendChild(drop)
  document.body.classList.add('modal-open')

  drop.addEventListener('click', e => e.stopPropagation())

  function fechar(){
    drop.remove()
    window.removeEventListener('click', fechar)
    document.removeEventListener('keydown', onEsc)
    document.body.classList.remove('modal-open')
  }

  function onEsc(e){ if(e.key === 'Escape') fechar() }

  setTimeout(()=>{
    window.addEventListener('click', fechar)
    document.addEventListener('keydown', onEsc)
  },0)

  const btnEntrar = drop.querySelector('#ml-entrar')
  const btnCadastrar = drop.querySelector('#ml-cadastrar')
  const inputNome = drop.querySelector('#ml-nome')
  const inputEmail = drop.querySelector('#ml-email')
  const inputSenha = drop.querySelector('#ml-senha')
  const feedback = drop.querySelector('#ml-feedback')

  btnCadastrar.addEventListener('click', () => {
    const nome = inputNome.value.trim()
    const email = inputEmail.value.trim()
    const senha = inputSenha.value.trim()
    if(!nome || !email || !senha){ feedback.textContent = 'Preencha nome, email e senha.'; return }
    register({ nome, email, senha })
    feedback.style.color = 'green'
    feedback.textContent = 'Cadastro realizado. Você está logado.'
    setTimeout(()=> { fechar(); atualizarHeaderUsuario() }, 800)
  })

  btnEntrar.addEventListener('click', () => {
    const email = inputEmail.value.trim()
    const senha = inputSenha.value.trim()
    const ok = login(email, senha)
    if(!ok){ feedback.textContent = 'Credenciais inválidas.'; return }
    feedback.style.color = 'green'
    feedback.textContent = 'Logado com sucesso.'
    setTimeout(()=> { fechar(); atualizarHeaderUsuario() }, 600)
  })
}

export function iniciarModalLogin(){
  const divLogin = document.querySelector('#login')
  if(!divLogin) return
  divLogin.addEventListener('click', () => abrirModalLogin())
}

function atualizarHeaderUsuario(){
  const divLogin = document.querySelector('#login')
  if(!divLogin) return
  // limpar conteúdo
  divLogin.innerHTML = ''
  if(!isLogged()){
    // restaurar conteúdo padrão
    divLogin.innerHTML = `
      <img src="/assets/icons/user.png">
      <div class="entre-cadastre-se">
        <span class="underline">Entre </span>
        <span>ou</span>
        <br>
        <span class="underline">cadastre-se</span>
      </div>
    `
    // re-bind click to abrirModal
    divLogin.removeEventListener('click', abrirModalLogin)
    divLogin.addEventListener('click', abrirModalLogin)
    return
  }

  const user = getUser()
  const nome = user?.nome || 'Usuário'
  // saudação e link de sair (tag normal, não button)
  divLogin.innerHTML = `
    <div style="display:flex;align-items:center;gap:8px;cursor:default">
      <img src="/assets/icons/user.png" style="width:26px;height:26px;border-radius:50%">
      <div style="display:flex;flex-direction:column;">
        <span style="font-weight:600">Olá, ${nome}</span>
      </div>
    </div>
    <div style="text-align:center;margin-top:6px">
      <a href="#" id="logout-link" style="color:#ff6500;text-decoration:none;display:inline-block">Sair</a>
    </div>
  `

  const logoutLink = divLogin.querySelector('#logout-link')
  if(logoutLink){
    logoutLink.addEventListener('click', (e) => {
      e.preventDefault()
      logout()
      atualizarHeaderUsuario()
    })
  }
}

// inicializar estado do header ao carregar o módulo
setTimeout(() => {
  try{ atualizarHeaderUsuario() }catch(e){}
}, 0)
