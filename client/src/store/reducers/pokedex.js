// deps
import createReducer from 'utils/createReducer';

// initial state & constants
import { POKEDEX_STATE } from '../initial-state';
import { POKEDEX_TYPES } from 'constants/action-types';

export default createReducer(POKEDEX_STATE, {
  [`${POKEDEX_TYPES.POKEDEX_GET_POKEMONS}_SUCCESS`]: (state, action) => {
    const { payload } = action;

    const { data } = payload;

    return {
      ...state,
      data
    };
  }
});
