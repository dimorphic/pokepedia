// deps
import createReducer from 'utils/createReducer';

// initial state & constants
import { POKEDEX_STATE } from '../initial-state';
import { POKEDEX_TYPES } from 'constants/action-types';

export default createReducer(POKEDEX_STATE, {
  [`${POKEDEX_TYPES.POKEDEX_GET_POKEMONS_SUCCESS}`]: (state, action) => {
    const { data } = action.payload;

    return {
      ...state,
      pokemons: data
    };
  },

  [`${POKEDEX_TYPES.POKEDEX_GET_ITEMS_SUCCESS}`]: (state, action) => {
    const { data } = action.payload;

    return {
      ...state,
      items: data
    };
  }
});
