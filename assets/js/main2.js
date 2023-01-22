const loadMoreButton = document.getElementById('loadMoreButton')
const pokemonList = document.getElementById('pokemonList')

const maxRecords = 151

const limit = 2;
let offset = 0;

function convertPokemonToLi(pokemon) {
    return `
        <li class="pokemon ${pokemon.type}">
            <div class="number">#${pokemon.number}</div>
            <div class="name">${pokemon.name}</div>
            <div class="detail">
                <ol class="stats">
                
                <ol class="atributes">
                    <li>HP:</li>
                    <li>Attack:</li>
                    <li>Defense:</li>
                    <li>Special Atk:</li>
                    <li>Special Def:</li>
                    <li>Speed:</li>
                </ol>

                ${pokemon.stats.map((base_stat) => `<li class="stat">${base_stat} <label class="progressBar"><progress value="${base_stat}" max="150"></progress></label></li>`).join('')}
                </ol>

                <ol class="types">
                    ${pokemon.types.map((type) => `<li class="type ${type}">${type}</li>`).join('')}
                </ol>

                <img src="${pokemon.photo}">
            </div>
        </li>
    `
}

function loadPokemonItens(offset, limit) {
    pokeApi.getPokemons(offset, limit).then((pokemons = []) => {
        const newHtml = pokemons.map(convertPokemonToLi).join('')
        pokemonList.innerHTML += newHtml
    })
}

loadPokemonItens(offset, limit)


loadMoreButton.addEventListener('click', () => {
    offset += limit
    const qtdRecordsWithNexPage = offset + limit

    if (qtdRecordsWithNexPage >= maxRecords) {
        const newLimit = maxRecords - offset
        loadPokemonItens(offset, newLimit)

        loadMoreButton.parentElement.removeChild(loadMoreButton)
    } else {
        loadPokemonItens(offset, limit)
    }
})