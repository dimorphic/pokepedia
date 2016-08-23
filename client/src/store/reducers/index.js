// deps
import { combineReducers } from 'redux';
import { routerStateReducer } from 'redux-router';

// reducers
import location from './location';
import pokedex from './pokedex';
import auth from './auth';
import user from './user';
import filters from './filters';

export default combineReducers({
  router: routerStateReducer,
  location,
  pokedex,
  auth,
  user,
  filters
});
