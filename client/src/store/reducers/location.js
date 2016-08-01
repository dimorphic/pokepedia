// deps
const HANDLERS = [];
// export default createReducer( new ProductState(), handlers );

// deps
import initialState from '../initial-state';
import { LOCATION_TYPES } from 'constants/action-types';

export default function location(state = initialState.location, action) {
  // const { payload } = action;

  switch (action.type) {
    case LOCATION_TYPES.LOCATION_LOAD_MAP: {
      console.log('LOCATION REDUCER @ LOCATION_LOAD_MAP');

      return {
        lat: 123,
        long: 456
      };
    }

    default:
      return state;
  }
}
