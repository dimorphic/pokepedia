// deps
import jsonfile from 'jsonfile';
import { pokemon as POKEDEX } from 'pokemon-go-pokedex';
import CONFIG from '../config';
import { renameProp } from '../helpers';

// helpers
const UTILS = CONFIG.get('utils');
const PATHS = UTILS.paths;

// const LANGUAGES_LOCALE = ['en', 'de', 'fr'];
const pokemonDir = `${PATHS.data()}/pokemon`;
const patchName = `${pokemonDir}/patches/pokemon-names+types`;
const patchResult = `${pokemonDir}/build_pokedex.json`;

// @TODO
const RENAMES = (item) => {
  return [
    renameProp(item, 'num', 'pokemonIdzBro')
  ];
};

function batchRename(list, oldName, newName) {
  if (!Array.isArray(list) || !list.length) { throw new Error('Need array bro!'); }

  return list.map((item) => {
    renameProp(item, 'num', 'pokemonIdzBro');
    return item;
  });
}

const nextEvolutions = [
  {
    num: '002',
    name: 'Ivysaur'
  },
  {
    num: '003',
    name: 'Venusaur'
  }
];

// console.log(batchRename(nextEvolutions));
// process.exit(0);

// @TODO: generalize this somehow ?
function patchPokedex(languageLocale = 'en') {
  const patchFile = `${patchName}.${languageLocale.toLowerCase()}.json`;

  console.log('LOADING PATCH @ ', patchFile);
  const patch = require(patchFile);

  const POKE_PATCH = POKEDEX.map((pokemon) => {
    // update name & type based on language locale
    const { name, type } = patch[pokemon.id];

    // da fak am i doing?
    // RENAMES().forEach(Function.prototype.call, Function.prototype.call);
    renameProp(pokemon, 'num', 'pokemonId');

    return {
      ...pokemon,
      name,
      type
    };
  });

  // @TODO: add batch rename of properties to something more meaningful?
  // renameProp(newPokemon, 'num', 'pokemonId');

  return POKE_PATCH;
}

// compose new custom Pokedex DB
const newPokedex = patchPokedex('en');
console.log(newPokedex);

// @TODO: write result to file?
jsonfile.writeFile(patchResult, newPokedex, { spaces: 2 }, (err) => {
  console.error(err);
});
