export function iniciarLogin(){

  const divLogin = document.querySelector('#login')
  if(!divLogin) return

  divLogin.addEventListener('click', () => {

    const dropdown = document.createElement('section')

    dropdown.innerHTML = `
      <section class="dropDown">
        <span>Acesse sua conta</span>
        <input type="text" placeholder="Email">
      </section>
    `

    document.body.appendChild(dropdown)

    function fechar(){
      dropdown.remove()
      window.removeEventListener('click',fechar)
    }

    setTimeout(()=>{
      window.addEventListener('click',fechar)
    },0)
  })
}
