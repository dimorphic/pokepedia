// deps
import API from './api';

export function getAllPokemons() {
  return API.get('/pokedex');
}
