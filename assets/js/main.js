const pokemonList = document.getElementById('pokemonList')
const loadMoreButton = document.getElementById('loadMoreButton')

const maxRecords = 151
const limit = 10
let offset = 0;

function convertPokemonToLi(pokemon) {
    return `
        <li class="pokemon ${pokemon.type}" id="${pokemon.number}">
            <span class="number">#${pokemon.number}</span>
            <span class="name">${pokemon.name}</span>

            <div class="detail">
                <ol class="types">
                    ${pokemon.types.map((type) => `<li class="type ${type}">${type}</li>`).join('')}
                </ol>

                <img src="${pokemon.photo}"
                    alt="${pokemon.name}">
            </div>
            <button class="btn-details">Details</button>
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

function loadPokemonById(pokemon) {
    return `
        <li class="pokemon ${pokemon.type} details" id="${pokemon.number}">
            <span class="number">#${pokemon.number}</span>
            <span class="name">${pokemon.name}</span>

            <div class="detail">
                <ol class="types">
                    ${pokemon.types.map((type) => `<li class="type ${type}">${type}</li>`).join('')}
                </ol>

                <img src="${pokemon.photo}"
                    alt="${pokemon.name}">
            </div>  
        </li>
        <li>
            <table class="tableDetails tableDetails1">
                <tr class="trDetails">
                    <td class="nameTd">Height</td>
                    <td class="tdValues">${pokemon.height}</td>
                </tr>
                <tr class="trDetails">
                    <td class="nameTd">Weight</td>
                    <td class="tdValues">${pokemon.weight}</td>
                </tr>
                <tr class="trDetails">
                    <td class="nameTd">Abilities</td>
                    <td class="tdValues">${pokemon.abilities.join(', ')}</td>
                </tr>
            </table>
        </li>
        <li>
            <table class="tableDetails">
                <tr class="trDetails">
                    <td class="nameTd">HP</td>
                    <td class="tdValues">${pokemon.stats[0]}</td>
                </tr>
                <tr class="trDetails">
                    <td class="nameTd">Attack</td>
                    <td class="tdValues">${pokemon.stats[1]}</td>
                </tr>
                <tr class="trDetails">
                    <td class="nameTd">Defense</td>
                    <td class="tdValues">${pokemon.stats[2]}</td>
                </tr>
                <tr class="trDetails">
                    <td class="nameTd">Special-Attack</td>
                    <td class="tdValues">${pokemon.stats[3]}</td>
                </tr>
                <tr class="trDetails">
                    <td class="nameTd">Special-Defense</td>
                    <td class="tdValues">${pokemon.stats[4]}</td>
                </tr>
                <tr class="trDetails">
                    <td class="nameTd">Speed</td>
                    <td class="tdValues">${pokemon.stats[5]}</td>
                </tr>
            </table>
        </li>
    `
}

pokemonList.addEventListener('click', (e) => {

    const pokemonId = e.target.parentElement.id

    pokemonDetails.getPokemonById(pokemonId).then(res => {
        pokemonList.innerHTML = loadPokemonById(res)
    })

    loadMoreButton.hidden = true
    
})

