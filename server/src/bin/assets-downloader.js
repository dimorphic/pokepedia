// deps
// import '../polyfills';
import { downloadFile, logger, getFileName } from '../utils/helpers';
import CONFIG from '../config';

// other helpers
const UTILS = CONFIG.get('utils');
const PATHS = UTILS.paths;
const IS_LINK = /^(http|https):\/\//gmi; // HTTP / HTTPS link check

// settings
// const POKEDEX_LINK = `${PATHS.data()}/pokemon/pokedex.en.build.json`;
const POKEDEX = require(`${PATHS.data()}/pokemon/pokedex`);
const saveDir = `${PATHS.assets()}/pokemons`;

// @DEBUG
// http://www.serebii.net/pokemongo/pokemon/<pokemon-id>.png

//
//  Le Downloader
//
function batchDownload() {
  POKEDEX.forEach((pokemon) => {
    console.log('Pokemon : ', pokemon.name, pokemon.pokemonId);

    const imageURI = `http://www.serebii.net/pokemongo/pokemon/${pokemon.pokemonId}.png`;
    const savePath = `${saveDir}/${pokemon.pokemonId}.png`;

    // go get'em boy!
    downloadFile(imageURI, savePath, (err, file) => {
      if (err) {
        console.log(err);
        return void 0;
      }

      return logger.trace('Done @ ', savePath);
    });
  });
}

// just do it?
batchDownload();
