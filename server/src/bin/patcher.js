// deps
import '../polyfills';

import jsonfile from 'jsonfile';
import { pokemon as POKEDEX } from 'pokemon-go-pokedex';
import CONFIG from '../config';
import { renameProp, getFileName } from '../utils/helpers';

// helpers
const UTILS = CONFIG.get('utils');
const PATHS = UTILS.paths;

// raw data dir
const rawData = `${PATHS.data()}/raw`;

// @TODO
const patchProps = (item) => {
  const patches = [
    () => {
      // clear unwanted keys
      delete item.img;
    },

    // rename num -> pokemonId
    () => { renameProp(item, 'num', 'pokemonId'); },

    // rename num in evolutions[] to pokemonId
    () => {
      const { next_evolution = null, prev_evolution = null } = item;
      const canParse = (array) => { return (Array.isArray(array) && array.length); };

      if (canParse(next_evolution)) {
        batchRename(next_evolution, 'num', 'pokemonId');
      }

      if (canParse(prev_evolution)) {
        batchRename(prev_evolution, 'num', 'pokemonId');
      }
    },

    // add candy info
    () => {
      if (!item.candy_count) {
        item.candy_count = 0;
      } else {
        item.candy_count = parseInt(item.candy_count, 10);
      }

      renameProp(item, 'candy', 'candy_name');
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

// @TODO: generalize this somehow ?
function patchPokedex(language = 'EN') {
  // names + types patch
  const localePatchFile = `${rawData}/patches/pokemon-names+types.${language.toLowerCase()}.json`;
  const LOCALE_PATCH = require(localePatchFile);

  // base stats patch
  const BASE_STATS_PATCH = require(`${rawData}/proto-baseStats.json`);

  console.time('PATCHING DEX');
  const POKE_PATCH = POKEDEX.map((pokemon) => {
    // update name & type based on language locale
    const { name, type } = LOCALE_PATCH[pokemon.id];

    // find pokemon base stats info
    const pokemonBaseStats = BASE_STATS_PATCH.find((stats) => {
      return stats.id === pokemon.id;
    });

    // get attack, defense, stamina
    const { BaseAttack, BaseDefense, BaseStamina } = pokemonBaseStats;
    const { BaseCaptureRate, BaseFleeRate } = pokemonBaseStats;

    // da fak am i doing?
    patchProps(pokemon);

    const stats = {
      attack: BaseAttack,
      defense: BaseDefense,
      stamina: BaseStamina,

      height: parseFloat(pokemon.height, 10),
      weight: parseFloat(pokemon.weight, 10)
    };

    return {
      id: pokemon.id,
      pokemonId: pokemon.pokemonId,

      name,
      capture_rate: parseFloat(BaseCaptureRate.toFixed(2)),
      flee_rate: parseFloat(BaseFleeRate.toFixed(2)),

      candy_count: pokemon.candy_count,
      candy_name: pokemon.candy_name,
      egg: (parseInt(pokemon.egg, 10) || 0),

      multipliers: (pokemon.multipliers ? [].concat(pokemon.multipliers) : null),
      stats,
      type,
      weaknesses: pokemon.weaknesses,

      next_evolution: pokemon.next_evolution,
      prev_evolution: pokemon.prev_evolution
    };
  });

  console.timeEnd('PATCHING DEX');
  return POKE_PATCH;
}

function patchItems() {
  const ITEMS = require(`${rawData}/items.json`);

  console.time('PATCHING ITEMS');

  const ITEMS_PATCH = ITEMS.map((item) => {
    return {
      id: item.id,
      name: item.name,
      img: getFileName(item.img).replace('.png', '').toLowerCase()
    };
  });

  console.timeEnd('PATCHING ITEMS');

  return ITEMS_PATCH;
}

// compose new pokemons dex
const LOCALE = 'EN';
const newPokemonsDex = patchPokedex(LOCALE);
const newPokemonsDestination = `${PATHS.data()}/pokedex/pokedex.${LOCALE.toLowerCase()}.build.json`;

jsonfile.writeFile(newPokemonsDestination, newPokemonsDex, { spaces: 2 }, (err) => {
  if (err) console.error(err);
});

// compose new items dex
const newItemsDex = patchItems();
const newItemsDestination = `${PATHS.data()}/pokedex/items.en.build.json`;

jsonfile.writeFile(newItemsDestination, newItemsDex, { spaces: 2 }, (err) => {
  if (err) console.error(err);
});
