// deps
import '../polyfills';

import jsonfile from 'jsonfile';
import { pokemon as POKEDEX } from 'pokemon-go-pokedex';
import CONFIG from '../config';
import { renameProp } from '../utils/helpers';

// helpers
const UTILS = CONFIG.get('utils');
const PATHS = UTILS.paths;

// const LANGUAGES_LOCALE = ['en', 'de', 'fr'];
const pokemonDir = `${PATHS.data()}/pokemon`;
const patchName = `${pokemonDir}/patches/pokemon-names+types`;

// @TODO
const patchProps = (item) => {
  const patches = [
    () => { renameProp(item, 'num', 'pokemonId'); },
    () => {
      const { next_evolution = null, prev_evolution = null } = item;
      const canParse = (array) => { return (Array.isArray(array) && array.length); };

      if (canParse(next_evolution)) {
        batchRename(next_evolution, 'num', 'pokemonId');
      }

      if (canParse(prev_evolution)) {
        batchRename(prev_evolution, 'num', 'pokemonId');
      }
    }
  ];

  // just do it!
  patches.forEach(Function.prototype.call, Function.prototype.call);
};

function batchRename(list, oldName, newName) {
  if (!Array.isArray(list) || !list.length) { throw new Error('Need array bro!'); }

  return list.map((item) => {
    renameProp(item, oldName, newName);
    return item;
  });
}

// console.log(batchRename(nextEvolutions));
// process.exit(0);

// @TODO: generalize this somehow ?
function patchPokedex(languageLocale = 'en') {
  const patchFile = `${patchName}.${languageLocale.toLowerCase()}.json`;

  console.log('LOADING PATCH @ ', patchFile);
  const patch = require(patchFile);

  console.time('PATCHING DEX');
  const POKE_PATCH = POKEDEX.map((pokemon) => {
    // update name & type based on language locale
    const { name, type } = patch[pokemon.id];

    // da fak am i doing?
    patchProps(pokemon);

    // clear unwanted keys
    delete pokemon.img;

    return {
      ...pokemon,
      name,
      type
    };
  });

  console.timeEnd('PATCHING DEX');
  return POKE_PATCH;
}

// compose new custom Pokedex DB
const LOCALE = 'EN';
const patchResult = `${pokemonDir}/pokedex.${LOCALE.toLowerCase()}.build.json`;
const newPokedex = patchPokedex(LOCALE);
// console.log(newPokedex);

// @TODO: write result to file?
jsonfile.writeFile(patchResult, newPokedex, { spaces: 2 }, (err) => {
  if (err) console.error(err);
});
