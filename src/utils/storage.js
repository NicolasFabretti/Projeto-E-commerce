export function salvarCep(data){
  localStorage.setItem(
    'cepUsuario',
    JSON.stringify(data)
  )
}

export function obterCep(){
  return JSON.parse(
    localStorage.getItem('cepUsuario')
  )
}
