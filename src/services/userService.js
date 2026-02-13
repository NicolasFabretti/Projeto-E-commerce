const USER_KEY = 'user'

export function getStoredUser(){
  const raw = localStorage.getItem(USER_KEY)
  return raw ? JSON.parse(raw) : null
}

export function isLogged(){
  return !!getStoredUser()
}

export function register({ nome, email, senha, cep, endereco }){
  const id = Date.now()
  const user = { id, nome, email, senha, cep, endereco }
  localStorage.setItem(USER_KEY, JSON.stringify(user))
  return user
}

export function login(email, senha){
  const user = getStoredUser()
  if(!user) return false
  if(user.email === email && user.senha === senha) return user
  return false
}

export function logout(){
  localStorage.removeItem(USER_KEY)
}

export function getUser(){
  return getStoredUser()
}

