// traduzindo os tipos em inglês para português
const traducaoTipos = {
  normal: 'Normal',
  fighting: 'Lutador',
  flying: 'Voador',
  poison: 'Veneno',
  ground: 'Terra',
  rock: 'Pedra',
  bug: 'Inseto',
  ghost: 'Fantasma',
  steel: 'Aço',
  fire: 'Fogo',
  water: 'Água',
  grass: 'Planta',
  electric: 'Elétrico',
  psychic: 'Psíquico',
  ice: 'Gelo',
  dragon: 'Dragão',
  dark: 'Sombrio',
  fairy: 'Fada',
}

function traduzirTipos(types) {
  return types.map(type => letraMaiuscula(traducaoTipos[type.type.name])).join(' e ')
}

//Buscador de Pokemon pelo Nome e tambem pelo numero

function buscarPokemon(nomeOuNumero){
  let idInput = `inputPokemon${nomeOuNumero}`
  let nomePokemon = document.getElementById(idInput).value.trim().toLowerCase()
  const urlAPIpokemon = `https://pokeapi.co/api/v2/pokemon/${nomePokemon}`

  fetch(urlAPIpokemon)
  .then(r => {
    if (!r.ok) {
      throw new Error('Pokemon não encontrado'); // Gera um erro para ser recebido no catch
    }
    return r.json()
  })
  .then(dadosPokemon => mostrarPokemon(dadosPokemon, nomeOuNumero))
  
  .catch(() => mostraError(nomeOuNumero));
}

document.getElementById('inputPokemon1').addEventListener('blur', function() {
 
  const valorInput = this.value.trim().toLowerCase()
   // Caso não possua valor no input o clique fora não funcionará
  if(valorInput !== ''){

    buscarPokemon(1)
    mostrarProximosPokemons()

}
});

//buscar o pokemon só colocando o nome e clicando no enter
document.getElementById('inputPokemon1').addEventListener('keydown', function(event) {
  if (event.key === 'Enter') {
    buscarPokemon(1)
  }
})


//Mostrar as informaçoes do pokemon

function letraMaiuscula(string) {
  return string.charAt(0).toUpperCase() + string.slice(1)
}

function mostrarPokemon(dadosPokemon, nomeOuNumero) {
  let infoDivID = `infPokemon${nomeOuNumero}`
  let infoDiv = document.getElementById(infoDivID)

  // Preenchendo as tags HTML com os dados do Pokémon
  infoDiv.querySelector('h2').textContent = dadosPokemon.name.toUpperCase()

  infoDiv.querySelector('.tipo').textContent = `Tipo: ${traduzirTipos(dadosPokemon.types)}`//Aqui puxa as traduções


  infoDiv.querySelector('.imgPokemon').src = dadosPokemon.sprites.other['dream_world'].front_default

  infoDiv.querySelector('.numero').textContent = `#${dadosPokemon.id}`

  infoDiv.querySelector('.peso').textContent = `${dadosPokemon.weight / 10}Kg`

  infoDiv.querySelector('.altura').textContent = ` ${dadosPokemon.height / 10}m`

  infoDiv.querySelector('.hp').textContent = ` ${dadosPokemon.stats.find(stat => stat.stat.name === 'hp').base_stat}`

  infoDiv.querySelector('.ataque').textContent = ` ${dadosPokemon.stats.find(stat => stat.stat.name === 'attack').base_stat}`

  infoDiv.querySelector('.defesa').textContent = ` ${dadosPokemon.stats.find(stat => stat.stat.name === 'defense').base_stat}`

  infoDiv.querySelector('.ataque-especial').textContent = `${dadosPokemon.stats.find(stat => stat.stat.name === 'special-attack').base_stat}`

  infoDiv.querySelector('.defesa-especial').textContent = ` ${dadosPokemon.stats.find(stat => stat.stat.name === 'special-defense').base_stat}`

  infoDiv.querySelector('.velocidade').textContent = ` ${dadosPokemon.stats.find(stat => stat.stat.name === 'speed').base_stat}`

  limparCampoInput(`inputPokemon${nomeOuNumero}`)
  
  //Se não tiver a imgem na API damos a mensagem de erro
  const imagem = infoDiv.querySelector('.imgPokemon')
  imagem.onerror = function () {
    exibirMensagemErro(imagem)
  }

  function exibirMensagemErro(imagem) {
    imagem.src = '' // Limpa o src para garantir que a mensagem de erro seja exibida corretamente
    imagem.alt = 'Poxa! Ainda não capturamos a imagem desse Pokémon.'
    imagem.classList.add('mensagemErro')
  }

}

//Quando o Pokemon não é encontrado

function mostraError(nomeOuNumero){
  let infoDivID = `infPokemon${nomeOuNumero}`
  let infoDiv = document.getElementById(infoDivID)
  infoDiv.innerHTML = `
  <p class="erroDeBusca" >Ops! Não conseguimos encontrar informações sobre esse pokémon. Verifique se o nome ou número estão corretos e tente novamente. Clique em Pokedex e faça uma nova busca</p>`
 
  
}


//pokemon inicial da página

window.onload = function(){
  document.getElementById('inputPokemon1').value = "Psyduck"
  buscarPokemon(1)
  
}

document.getElementById('reset').addEventListener('click', function() {
  location.reload(); // Isso recarregará a página
});
function limparCampoInput(idInput) {
  document.getElementById(idInput).value = '';
}