export function carregarEnderecoSalvo(){

  const alterarFrase =
    document.querySelector('.underline')

  if(!alterarFrase) return

  const enderecoSalvo =
    JSON.parse(localStorage
    .getItem('cepUsuario'))

  if(enderecoSalvo){

    alterarFrase.textContent =
    `${enderecoSalvo.logradouro},
     ${enderecoSalvo.bairro}.
     ${enderecoSalvo.localidade}/
     ${enderecoSalvo.uf}`

    alterarFrase.classList
    .add('frase-logradouro')
  }
}


export function salvarUsuario(novoUsuario){

  const usuarios = JSON.parse(localStorage.getItem('usuarios')) || []

  const jaExiste = usuarios.some(u => u.email === novoUsuario.email)

  if(jaExiste){
    throw new Error('Email já cadastrado')
  }

  usuarios.push(novoUsuario)

  localStorage.setItem(
    'usuarios',
    JSON.stringify(usuarios)
  )
}


export function listarUsuarios(){
  return JSON.parse(
    localStorage.getItem('usuarios')) || []

}


export function buscarUsuarioPorEmail(email){
  const usuarios =
    JSON.parse(localStorage.getItem('usuarios')) || []

  return usuarios.find(
    user => user.email === email
  )
}
