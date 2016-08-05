// deps
import * as PokedexAPI from 'api/pokedex';

// actions types
import { POKEDEX_TYPES as TYPES } from 'constants/action-types';

export const getPokemons = () => ({
  type: TYPES.POKEDEX_GET_POKEMONS,
  payload: PokedexAPI.getAllPokemons()
});

export const getPokemonById = (pokemonId) => ({
  type: TYPES.POKEDEX_GET_POKEMON_BY_ID,
  payload: PokedexAPI.getPokemonById(pokemonId)
});
