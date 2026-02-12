import { buscarCep } from '../services/cepService.js'
import { salvarCep, obterCep } from '../utils/storage.js'

export function iniciarModalCep(){

  const divCep = document.querySelector('#CEP')
  const alterarFrase = document.querySelector('.underline')

  if(!divCep) return

  // carregar salvo ao iniciar
  const enderecoSalvo = obterCep()

  if(alterarFrase && enderecoSalvo){
    alterarFrase.textContent =
      `${enderecoSalvo.logradouro},
       ${enderecoSalvo.bairro}.
       ${enderecoSalvo.localidade}/${enderecoSalvo.uf}`
  }

  divCep.addEventListener('click', (e) => {

    e.stopPropagation()

    const modal = document.createElement('section')
    const overlay = document.createElement('div')

    modal.innerHTML = `
      <div class="click-cep">
        <input class="campo-cep" type="text">
        <button class="btnOk">OK</button>
      </div>
    `

    document.body.appendChild(overlay)
    document.body.appendChild(modal)

    const cep = modal.querySelector('.campo-cep')
    const btnOk = modal.querySelector('.btnOk')

    async function buscar(){

      try{

        btnOk.textContent='Buscando...'
        btnOk.disabled=true

        const data = await buscarCep(cep.value)

        alterarFrase.textContent =
          `${data.logradouro}, ${data.bairro}.
           ${data.localidade}/${data.uf}`

        salvarCep(data)

      }catch(err){
        alert(err.message)
      }finally{
        btnOk.textContent='OK'
        btnOk.disabled=false
      }
    }

    btnOk.addEventListener('click', buscar)
  })
}
