// deps
import { combineReducers } from 'redux';
import { routerStateReducer } from 'redux-router';

// reducers
import location from './location';
import pokedex from './pokedex';

export default combineReducers({
  router: routerStateReducer,
  location,
  pokedex
});
