// deps
import createReducer from '../../utils/createReducer';
import { merge } from 'lodash';

// initial state & constants
import { FILTERS_STATE } from '../initial-state';
import { FILTERS_TYPES } from '../../constants/action-types';

export default createReducer(FILTERS_STATE, {
  [FILTERS_TYPES.FILTERS_RESET]: (state, action) => {
    return merge({}, FILTERS_STATE);
  },

  [FILTERS_TYPES.FILTERS_SEARCH_UPDATE]: (state, action) => {
    const { payload } = action;

    return {
      ...state,
      search: {
        query: payload
      }
    };
  }
});
