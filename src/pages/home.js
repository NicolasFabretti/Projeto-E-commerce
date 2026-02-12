import { iniciarModalCep } from '../components/modalCep.js'
import { iniciarLogin } from '../components/modalLogin.js'
import { iniciarCarrosselBanners } from '../components/carroselBanners.js'
import { iniciarCarrosselProdutos } from '../components/carrosselProdutos.js'
import { iniciarRelogio } from '../components/relogio.js'

export function iniciarHome(){

  iniciarModalCep()
  iniciarLogin()
  iniciarCarrosselBanners()
  iniciarCarrosselProdutos()
  iniciarRelogio()

}
