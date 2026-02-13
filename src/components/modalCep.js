//importando a API do cep.
import { buscarCep } from "../services/cepService.js";

export function iniciarModalCep(){

  //Selecionando a div do CEP.
  const divCep = document.querySelector('#CEP')
  //se a div do cep for falsa, cancela a função.
  if(!divCep) return

  divCep.addEventListener('click',(e) =>{
    //impede de subir para o pai
    e.stopPropagation()

    //criando tag do modal do cep
    const modal = document.createElement('section')
    const overlay = document.createElement('div')

    //criando div do overlay
    overlay.innerHTML = `<div class="ponta-cep"></div>`
    //criando div do modal
    modal.innerHTML = `
      <div class="click-cep">
        <span style="font-weight:500;">
          Informe onde quer receber suas compras
          <hr>
        </span>

        <span style="margin:2px 0px 8px 0px;line-height:1.2;">
          Digite seu Cep para consultar os custos e prazos de <br>
          entregas para sua região.
        </span>

        <div class="input-modal">
          <input class="campo-cep" type="text"
          placeholder="Digite seu CEP*">

          <button class="btnOk">OK</button>
        </div>
      </div>
    `
    //adicionando no DOM
    document.body.appendChild(overlay)
    document.body.appendChild(modal)

    //impede de subir para o pai, evita fechar o modal
    modal.addEventListener('click', e => e.stopPropagation())

    function fecharModal(){
      modal.remove()
      overlay.remove()
      window.removeEventListener('click',fecharModal)
    }

    setTimeout(()=>{
      window.addEventListener('click',fecharModal)
    },0)
    //pegando os campos do modalcep
    const cep = modal.querySelector('.campo-cep')
    const btnOk = modal.querySelector('.btnOk')

    //pegando a frase do campo para deixar com o nome da rua do usuario
    const alterarFrase = document.querySelector('.underline')
    alterarFrase.classList.add('frase-logradouro')

    //evento do botao OK e buscar na API
    btnOk.addEventListener('click', async () =>{

      try{
        btnOk.textContent = 'Buscando...'
        btnOk.disabled = true

        const data = await buscarCep(cep.value)

        alterarFrase.textContent =
          `${data.logradouro}, ${data.bairro}.
          ${data.localidade}/${data.uf}`

        localStorage.setItem(
          'cepUsuario',
          JSON.stringify(data)
        )

      }catch(error){
        alert("erro ao buscar o cep")

      }finally{
        btnOk.textContent='OK'
        btnOk.disabled=false
      }
    })
  })
}
