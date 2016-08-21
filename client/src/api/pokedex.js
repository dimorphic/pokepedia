// deps
import API from './api';

export function getPokemons() {
  return API.get('/pokemons');
}

export function getItems() {
  return API.get('/items');
}
