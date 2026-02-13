export function iniciarRelogio(){

  const hora = document.querySelector('#hora')
  if(!hora) return

  function atualizar(){

    const agora=new Date()

    const h=String(agora.getHours()).padStart(2,'0')
    const m=String(agora.getMinutes()).padStart(2,'0')
    const s=String(agora.getSeconds()).padStart(2,'0')

    hora.textContent=`${h}:${m}:${s}`
  }

  atualizar()
  setInterval(atualizar,1000)
}
