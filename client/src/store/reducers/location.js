// deps
import createReducer from 'utils/createReducer';

// initial state & constants
import { LOCATION_STATE } from '../initial-state';
import { LOCATION_TYPES } from 'constants/action-types';

export default createReducer(LOCATION_STATE, {
  [LOCATION_TYPES.LOCATION_LOAD_MAP]: (state, action) => {
    console.log('LOCATION REDUCER @ LOCATION_LOAD_MAP');

    return {
      ...state,
      lat: 123,
      long: 456
    };
  }
});
