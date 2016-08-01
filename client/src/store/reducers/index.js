// deps
import { combineReducers } from 'redux';
import { routerStateReducer } from 'redux-router';

// reducers
import location from './location';

export default combineReducers({
  router: routerStateReducer,
  location
});
