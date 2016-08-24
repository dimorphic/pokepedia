import {pokemons as pokemonsController} from '../controllers';
import {auth as authController} from '../controllers';

console.log('authhh', authController)
const routes = ((app) => {
  app.get('/pokemons', pokemonsController.all);
  app.post('/pokemons/:id', pokemonsController.add);
  app.post('/login', authController.login);
  app.get('/user/:userId/inventories', authController.inventories);
  app.get('/user/:userId/inventories/:inventoryId', authController.inventory);
  app.put('/pokemons/:id', pokemonsController.update);
  app.delete('/pokemons/:id', pokemonsController.remove);
});

export default routes;
