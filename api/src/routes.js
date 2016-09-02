// deps
import { Router } from 'express';

// controllers
import PokemonsController from './controllers/pokemons';
import ItemsController from './controllers/items';
import LevelsController from './controllers/levels';

// create router
const router = Router();

// setup routes
router.get('/pokemons', PokemonsController.all);
router.get('/pokemons/:id', PokemonsController.getById);

router.get('/items', ItemsController.all);
router.get('/items/:id', ItemsController.getById);

router.get('/levels', LevelsController.all);
router.get('/levels/:id', LevelsController.getByLevel);

// fallback
router.get('/', (req, res) => {
  res.status(200).send('These aren\'t the Pokemons you\'re looking for...');
});

export default router;
