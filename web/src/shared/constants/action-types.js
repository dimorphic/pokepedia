//
// NOTE: all promise based actions are prefixed by default with
// ['PENDING', 'SUCCESS', 'FAILED'] keywords (via promise middleware)
// for better flow control
//

// deps
import createConstants from 'shared/utils/createConstants';

export const GLOBAL_TYPES = createConstants(
  'REQUEST_START',
  'REQUEST_END'
);

// pokedex
export const POKEDEX_TYPES = createConstants(
  'POKEDEX_GET_POKEMONS',
  'POKEDEX_GET_POKEMONS_PENDING',
  'POKEDEX_GET_POKEMONS_SUCCESS',

  'POKEDEX_GET_ITEMS',
  'POKEDEX_GET_ITEMS_PENDING',
  'POKEDEX_GET_ITEMS_SUCCESS',

  'POKEDEX_GET_LEVELS',
  'POKEDEX_GET_LEVELS_PENDING',
  'POKEDEX_GET_LEVELS_SUCCESS'

  // 'POKEDEX_GET_POKEMON_BY_ID',
  // 'POKEDEX_GET_POKEMON_BY_ID_PENDING',
  // 'POKEDEX_GET_POKEMON_BY_ID_SUCCESS'
);

// filters
export const FILTERS_TYPES = createConstants(
  'FILTERS_RESET',
  'FILTERS_SEARCH_UPDATE'
);
