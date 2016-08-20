// deps
import DB from '../helpers/db';

export function all(req, res) {
  const pokemons = DB.getPokemons();

  res.json(pokemons);
}

export function getById(req, res) {
  // find pokemon
  const pokemonId = req.params.id;
  const findPokemon = DB.getPokemonById(pokemonId);

  res.json(findPokemon);
}

export default { all, getById };
