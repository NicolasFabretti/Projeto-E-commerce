// Gerencia carrinho e curtidas via localStorage
const CART_KEY = 'cart'
const LIKES_KEY = 'likes'

export function getCart(){
  const raw = localStorage.getItem(CART_KEY)
  return raw ? JSON.parse(raw) : []
}

export function saveCart(cart){
    
  localStorage.setItem(CART_KEY, JSON.stringify(cart))
}

export function addToCart(id, qty = 1){
  id = Number(id)
  const cart = getCart()
  const item = cart.find(i => i.id === id)
  if(item) item.qty += qty
  else cart.push({ id, qty })
  saveCart(cart)
  return cart
}

export function removeFromCart(id){
  id = Number(id)
  let cart = getCart()
  cart = cart.filter(i => i.id !== id)
  saveCart(cart)
  return cart
}

export function changeQty(id, qty){
  id = Number(id)
  qty = Number(qty)
  const cart = getCart()
  const item = cart.find(i => i.id === id)
  if(!item) return cart
  item.qty = qty
  if(item.qty <= 0) return removeFromCart(id)
  saveCart(cart)
  return cart
}

export function clearCart(){
  saveCart([])
}

export function getLikes(){
  const raw = localStorage.getItem(LIKES_KEY)
  return raw ? JSON.parse(raw) : []
}

export function isLiked(id){
  id = Number(id)
  return getLikes().includes(id)
}

export function toggleLike(id){
  id = Number(id)
  const likes = getLikes()
  const idx = likes.indexOf(id)
  if(idx === -1){
    likes.push(id)
    localStorage.setItem(LIKES_KEY, JSON.stringify(likes))
    return true
  }
  likes.splice(idx, 1)
  localStorage.setItem(LIKES_KEY, JSON.stringify(likes))
  return false
}

export function getCartDetails(listaProdutos){
  const cart = getCart()
  return cart.map(i => {
    const p = listaProdutos.find(p => p.id === i.id)
    return p ? { ...p, qty: i.qty } : null
  }).filter(Boolean)
}
