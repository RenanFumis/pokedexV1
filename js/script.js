//Buscador de Pokemon pelo Nome e tambem pelo numero

function buscarPokemon(nomeOuNumero){
  let idInput = `inputPokemon${nomeOuNumero}`
  let nomePokemon = document.getElementById(idInput).value.trim().toLowerCase()
  const urlAPIpokemon = `https://pokeapi.co/api/v2/pokemon/${nomePokemon}`

fetch(urlAPIpokemon).then(r => r.json())
.then(dadosPokemon => mostrarPokemon(dadosPokemon, nomeOuNumero))
.catch(() => mostraError(nomeOuNumero))
 
// console.log(dadosPokemon)
}

//buscar o pokemon só colocando o nome e clicando no enter
document.getElementById('inputPokemon1').addEventListener('keydown', function(event) {
  if (event.key === 'Enter') {
    buscarPokemon(1);
  }
});

// document.getElementById('inputPokemon2').addEventListener('keydown', function(event) {
//   if (event.key === 'Enter') {
//     buscarPokemon(2);
//   }
// });


//Mostrar as informaçoes do pokemon

function letraMaiuscula(string) {
  return string.charAt(0).toUpperCase() + string.slice(1);
}

function mostrarPokemon(dadosPokemon, nomeOuNumero){
  let infoDivID = `infPokemon${nomeOuNumero}`
  let infoDiv = document.getElementById(infoDivID)

  infoDiv.innerHTML = `
  <h2>${dadosPokemon.name.toUpperCase()}</h2>
  <img class="imgPokemon" src="${dadosPokemon.sprites.other['dream_world'].front_default}">
  <p class="idPokemon">Número: ${dadosPokemon.id}</p>
  <p>Peso: ${dadosPokemon.weight/10}Kg</p>
  <p>Altura: ${dadosPokemon.height/10}m</p>
  <p>Tipo: ${dadosPokemon.types.map(type => letraMaiuscula(type.type.name)).join(', ')}</p>
  `
  //caso não possua imagem
  const imagem = infoDiv.querySelector('.imgPokemon')
  imagem.onerror = function () {
    exibirMensagemErro(imagem)
  }

  function exibirMensagemErro(imagem) {
    imagem.src = ''; // Limpa o src para garantir que a mensagem de erro seja exibida corretamente
    imagem.alt = 'Poxa! Ainda não capturamos a imagem desse pokémon'
    
  }

}

//Quando o Pokemon não é encontrado

function mostraError(nomeOuNumero){
  let infoDivID = `infPokemon${nomeOuNumero}`
  let infoDiv = document.getElementById(infoDivID)
  infoDiv.innerHTML = `
  <p class="erroDeBusca" >Calma jovem treinador!<br> Ainda não descobrimos esse pokémon, mas nossos Professores estão pesquisando dia e noite. Vá ao laboratório pokémon mais próximo e converse com o professor responsável</p>`
}

//pokemon inicial da página

window.onload = function(){
  document.getElementById('inputPokemon1').value = "Psyduck"
  buscarPokemon(1)
  // document.getElementById('inputPokemon2').value = "Wobbuffet"
  // buscarPokemon(2)
}