// deps
import * as PokedexAPI from 'shared/api/pokedex';

// actions types
import { POKEDEX_TYPES as TYPES } from 'shared/constants/action-types';

export const getPokemons = () => ({
  type: TYPES.POKEDEX_GET_POKEMONS,
  payload: PokedexAPI.getPokemons()
});

export const getItems = () => ({
  type: TYPES.POKEDEX_GET_ITEMS,
  payload: PokedexAPI.getItems()
});

export const getLevels = () => ({
  type: TYPES.POKEDEX_GET_LEVELS,
  payload: PokedexAPI.getLevels()
});

// export const getPokemonById = (pokemonId) => ({
//   type: TYPES.POKEDEX_GET_POKEMON_BY_ID,
//   payload: PokedexAPI.getPokemonById(pokemonId)
// });
