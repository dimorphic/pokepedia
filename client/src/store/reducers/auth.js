// deps
import createReducer from 'utils/createReducer';

// initial state & constants
import { AUTH_TYPES } from 'constants/action-types';

export default createReducer({}, {
  [`${AUTH_TYPES.LOGIN}_SUCCESS`]: (state, action) => {
    const { payload } = action;
    const { data } = payload;

    return {
      ...state,
      user: {...data.user}
    };
  }
});
