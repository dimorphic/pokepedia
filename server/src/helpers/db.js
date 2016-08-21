// deps
import fs from 'fs';
import CONFIG from '../config';

// helpers
const UTILS = CONFIG.get('utils');

// databases paths settings (plain storage / json for now)
const DB_POKEMONS = `${UTILS.paths.data()}/pokedex/pokemons.en.build.json`;
const DB_ITEMS = `${UTILS.paths.data()}/pokedex/items.en.build.json`;

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
    return JSON.parse(fs.readFileSync(path, 'utf8'));
  }

  reload() {
    console.log('[DB] Reloading data...');
    this.data = this.load();
  }

  getAll() {
    return this.data;
  }

  getById(id) {
    return this.data.find((item) => {
      return item.id == id;
    });
  }
}

// expose
const DB = {
  pokemons: new Database({ path: DB_POKEMONS }),
  items: new Database({ path: DB_ITEMS })
};

export default DB;
