
var pokemonDetails = {}

function convertPokemonToDetails(pokeDetail) {
    const pokemon = new Pokemon()
    pokemon.number = pokeDetail.id
    pokemon.name = pokeDetail.name

    const types = pokeDetail.types.map((typeSlot) => typeSlot.type.name)
    const [type] = types

    pokemon.types = types
    pokemon.type = type

    pokemon.photo = pokeDetail.sprites.other.dream_world.front_default


    // especific details - part 1
    pokemon.height = pokeDetail.height
    pokemon.weight = pokeDetail.weight

    const abilities = pokeDetail.abilities.map(nameAbility => nameAbility.ability.name)
    const [ability] = abilities
    pokemon.abilities = abilities
    pokemon.ability = ability

    // especific details - part 2
    const stats = pokeDetail.stats.map(stat => stat.base_stat)
    pokemon.stats = stats

    return pokemon
}

pokemonDetails.getPokemonById = (id) => {
    const url = `https://pokeapi.co/api/v2/pokemon/${id}`

    return fetch(url)
        .then((response) => pokemonDetails = response.json())
        .then(convertPokemonToDetails)
        .catch(error => console.log(error))
}



