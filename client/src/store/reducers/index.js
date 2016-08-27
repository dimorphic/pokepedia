// deps
import { combineReducers } from 'redux';
import { routerStateReducer } from 'redux-router';

// reducers
import global from './global';
import pokedex from './pokedex';
import filters from './filters';

export default combineReducers({
  router: routerStateReducer,

  global,
  pokedex,
  filters
});
