export async function buscarCep(cep){

  const cepLimpo = cep.replace(/\D/g,'')

  if(cepLimpo.length !== 8){
    throw new Error('CEP inválido')
  }

  const resposta =
    await fetch(`https://viacep.com.br/ws/${cepLimpo}/json/`)

  const data = await resposta.json()

  if(data.erro){
    throw new Error('CEP não encontrado')
  }

  return data
}



