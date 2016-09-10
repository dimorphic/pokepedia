// deps
import createReducer from '../../utils/createReducer';

// initial state & constants
import { GLOBAL_STATE } from '../initial-state';
import { GLOBAL_TYPES } from '../../constants/action-types';

function addRequest(state, action) {
  return {
    ...state,
    requestsInProgress: state.requestsInProgress + 1
  };
}

function finishRequest(state, action) {
  return {
    ...state,
    requestsInProgress: Math.max(0, state.requestsInProgress - 1)
  };
}

export default createReducer(GLOBAL_STATE, {
  [GLOBAL_TYPES.REQUEST_START]: addRequest,
  [GLOBAL_TYPES.REQUEST_END]: finishRequest
});
