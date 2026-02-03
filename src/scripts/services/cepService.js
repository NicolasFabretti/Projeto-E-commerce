export async function buscarCep(cep) {
    const response = await fetch(`https://brasilapi.com.br/api/cep/v1/{12090270}`)

    if(!response.ok) {
        throw new Error ('Erro na requisição')
    }

    const data = await response.json()

    if(data.erro) {
        throw new Error('CEP não encontrado')
    }
    return data
}