// deps
import { Router } from 'express';
import { inspect } from '../utils/helpers';

// app router
const router = Router();

router.get('/', (req, res, next) => {
  res.end('lolzz');
});

router.get('/pokemons', (req, res, next) => {
  console.log('poke @ ');
  console.log(req.db.data);

  res.end('get pokemons');
});

// get pokemon by id
// function getPokemonById()

router.get('/pokemon/:id', (req, res, next) => {
  const pokemonId = req.params.id;

  const findPokemon = req.db.getPokemonById(pokemonId);
  console.log(findPokemon);

  res.end(`<pre>${JSON.stringify(findPokemon)}</pre>`);
});

// reload local file DB
// @TODO: switch to Mongo?
router.get('/update', (req, res, next) => {
  // reload JSON data
  req.db.reload();

  // notify
  res.end(`<pre>${JSON.stringify(req.db.data)}</pre>`);

  console.log('\n>> NEW JSON DATA:\n');
  console.log(inspect(req.db.data));
  console.log(' ');
});

export default router;
