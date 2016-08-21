// deps
import { combineReducers } from 'redux';
import { routerStateReducer } from 'redux-router';

// reducers
import pokedex from './pokedex';
import filters from './filters';

export default combineReducers({
  router: routerStateReducer,

  pokedex,
  filters
});
