// deps
import '../polyfills';

import jsonfile from 'jsonfile';
import { pokemon as POKEDEX } from 'pokemon-go-pokedex';
import CONFIG from '../config';
import { inspect, renameProp, getFileName } from '../helpers/utils';

// helpers
const UTILS = CONFIG.get('utils');
const PATHS = UTILS.paths;
const isNumber = /\d+/g;

// raw data dir
const rawData = `${PATHS.data()}/raw`;
const pokedex = `${PATHS.data()}/pokedex`;

function writeJson(savePath, file) {
  jsonfile.writeFile(savePath, file, { spaces: 2 }, (err) => {
    if (err) console.error(err);
  });
}

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
  // patch paths & save location for new pokedex
  const localePatchFile = `${rawData}/patches/pokemon-names+types.${language.toLowerCase()}.json`;
  const baseStatsFile = `${rawData}/proto-baseStats.json`;

  // save path
  const savePath = `${PATHS.data()}/pokedex/pokemons.${language.toLowerCase()}.build.json`;

  // load locale & stats patch
  const LOCALE_PATCH = require(localePatchFile);
  const BASE_STATS_PATCH = require(baseStatsFile);

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

  writeJson(savePath, POKE_PATCH);
}

function patchItems() {
  // raw data
  const ITEMS = require(`${rawData}/items.json`);

  // save path
  const savePath = `${PATHS.data()}/pokedex/items.en.build.json`;

  console.time('PATCHING ITEMS');

  const ITEMS_PATCH = ITEMS.map((item) => {
    const filename = getFileName(item.img).replace('.png', '').toLowerCase();
    const itemCode = item.name.replace(isNumber, '')
                              .replace(/\W/g, '')
                              .toLowerCase();

    return {
      id: item.id,
      name: item.name,
      code: itemCode,
      img: filename
    };
  });

  console.timeEnd('PATCHING ITEMS');

  writeJson(savePath, ITEMS_PATCH);
}

function patchLevelRewards() {
  // pokedex / raw data
  const LEVELS = require(`${rawData}/level-rewards.json`);
  const LEVELS_CP = require(`${rawData}/cp-by-level.json`);
  const ITEMS = require(`${pokedex}/items.en.build.json`);

  // save path
  const savePath = `${PATHS.data()}/pokedex/levels.en.build.json`;

  console.time('PATCHING LEVEL REWARDS');

  const levelRewards = Object.keys(LEVELS).map((idx) => {
    const level = LEVELS[idx];

    const { Level, RequiredXP, TotalXP, Unlocks, Rewards, ...rest } = level;

    let rewards = [];

    Object.keys(rest).forEach((key) => {
      const code = key.toLowerCase();
      const value = rest[key];

      if (value) {
        // find item by code in pokedex
        const item = ITEMS.find((it) => {
          return it.code === code;
        });

        if (!item) { return; }

        // add reward to list
        rewards.push({
          code: item.code,
          count: value
        });
      }

      // console.log('rest item @ ', rewards);
    });

    return {
      id: parseInt(idx, 10),
      cp: LEVELS_CP[idx - 1],

      xp: {
        required: RequiredXP,
        total: TotalXP
      },

      rewards
    };
  });

  console.timeEnd('PATCHING LEVEL REWARDS');

  // console.log(inspect(levelRewards));
  writeJson(savePath, levelRewards);
}

// just do it!
// patchPokedex();
// patchItems();
patchLevelRewards();
