// deps
import { Router } from 'express';
import { inspect } from '../utils/helpers';

// app router
const router = Router();

router.get('/', (req, res, next) => {
  res.send(200);
});

router.get('/pokedex', (req, res, next) => {
  // get pokemons list
  const pokemons = req.db.getPokemons();

  res.json(pokemons);
});

// get pokemon by id
router.get('/pokedex/:id', (req, res, next) => {
  // find pokemon
  const pokemonId = req.params.id;
  const findPokemon = req.db.getPokemonById(pokemonId);

  res.json(findPokemon);
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
