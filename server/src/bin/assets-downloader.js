// deps
import { downloadFile, logger, getFileName } from '../utils/helpers';
import CONFIG from '../config';

// other helpers
const UTILS = CONFIG.get('utils');
const PATHS = UTILS.paths;
const IS_LINK = /^(http|https):\/\//; // HTTP / HTTPS link check

// data
const POKE_MONS = require(`${PATHS.data()}/pokedex`);
const POKE_ITEMS = require(`${PATHS.data()}/raw/items.json`);
const saveDir = `${PATHS.assets()}`;

//
//  Le Downloader
//
function downloadImage(imageURI, savePath) {
  if (!IS_LINK.test(imageURI)) {
    console.log('URI is not valid! ', imageURI);
    return void 0;
  }

  // go get'em boy!
  downloadFile(imageURI, savePath, (err, file) => {
    if (err) {
      console.log(err);
      return void 0;
    }

    return logger.trace('Done @ ', savePath);
  });
}

// @DEBUG
// http://www.serebii.net/pokemongo/pokemon/<mon-id>.png
// http://www.serebii.net/pokemongo/items/<item-id>.png

function downloadPokemons() {
  POKE_MONS.forEach((pokemon) => {
    console.log('Pokemon : ', pokemon.name, pokemon.pokemonId);

    const imageURI = `http://www.serebii.net/pokemongo/pokemon/${pokemon.pokemonId}.png`;
    const savePath = `${saveDir}/pokemons/${pokemon.pokemonId}.png`;

    downloadImage(imageURI, savePath);
  });
}

function downloadItems() {
  POKE_ITEMS.forEach((item) => {
    console.log('Item : ', item);

    const imageURI = item.img;
    const imageFilename = getFileName(imageURI).toLowerCase();
    const savePath = `${saveDir}/items/${imageFilename}`;

    downloadImage(imageURI, savePath);
  });
}

// just do it?
// downloadPokemons();
downloadItems();
