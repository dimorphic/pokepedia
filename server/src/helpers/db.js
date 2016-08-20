// deps
import { loadData } from './utils';
import CONFIG from '../config';

// helpers
const UTILS = CONFIG.get('utils');

// settings
const DB_PATH = `${UTILS.paths.data()}/pokedex/pokemons.en.build.json`;

//
// Plain file DB
//
class Database {
  constructor(options = {}) {
    if (!options.path) {
      throw new Error('Need a file, bro!');
    }

    this.path = options.path;
    this.data = {};

    this.init();
  }

  init() {
    console.log('[DB] Init...');
    this.data = this.load();
  }

  load(path = this.path) {
    console.log('[DB] Loading data @ ', path);
    return loadData(this.path);
  }

  reload() {
    console.log('[DB] Reloading data...');
    this.data = this.load();
  }

  getPokemons() {
    return this.data;
  }

  getPokemonById(pokemonId) {
    return this.data.filter((item) => {
      return item.id == pokemonId;
    });
  }
}

// expose
const DB = new Database({ path: DB_PATH });
export default DB;
