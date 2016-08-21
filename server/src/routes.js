// deps
import { Router } from 'express';

// controllers
import PokemonsController from './controllers/pokemons';
import ItemsController from './controllers/items';

// create router
const router = Router();

// setup routes
router.get('/', (req, res) => { res.status(200).send('meh'); });
router.get('/pokemons', PokemonsController.all);
router.get('/pokemons/:id', PokemonsController.getById);

router.get('/items', ItemsController.all);
router.get('/items/:id', ItemsController.getById);

export default router;
