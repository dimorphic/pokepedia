// deps
import { loadData } from './utils/helpers';
// const DEBUG = require('debug')('pokepedia:wtf');

// DB
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

  getPokemonById(pokemonId) {
    return this.data.filter((item) => {
      return item.id == pokemonId;
    });
  }
}

// expose
// const DB = new Database({ path: DB_FILE });
export default Database;
