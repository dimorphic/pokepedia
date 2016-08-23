// deps
import createReducer from 'utils/createReducer';

// initial state & constants
import { INVENTORY_TYPES } from 'constants/action-types';

export default createReducer({}, {
  [`${INVENTORY_TYPES.LOGIN}_SUCCESS`]: (state, action) => {
    const { payload } = action;
    const { data } = payload;

    return {
      ...state,
      inventory: data
    };
  }
});
