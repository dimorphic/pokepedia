//
// NOTE: all promise based actions are prefixed by default with
// ['PENDING', 'SUCCESS', 'FAILED'] keywords (via promise middleware)
// for better flow control
//

// deps
import createConstants from 'utils/constants';

// export const PROGRESS_TYPES = createConstants(
//   'PROGRESS'
// );

// pokedex
export const POKEDEX_TYPES = createConstants(
  'POKEDEX_GET_POKEMONS',
  'POKEDEX_GET_POKEMONS_PENDING',
  'POKEDEX_GET_POKEMONS_SUCCESS',

  'POKEDEX_GET_POKEMON_BY_ID',
  'POKEDEX_GET_POKEMON_BY_ID_PENDING',
  'POKEDEX_GET_POKEMON_BY_ID_SUCCESS'
);

// location
export const LOCATION_TYPES = createConstants(
  'LOCATION_LOAD_MAP'
);
