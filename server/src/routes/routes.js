import {pokemons as pokemonsController} from '../controllers';
import {auth as authController} from '../controllers';

console.log('authhh', authController)
const routes = ((app) => {
  app.get('/pokemons', pokemonsController.all);
  app.post('/pokemons/:id', pokemonsController.add);
  app.post('/login', authController.login);
  app.get('/user/:id/inventory', authController.inventory);
  app.put('/pokemons/:id', pokemonsController.update);
  app.delete('/pokemons/:id', pokemonsController.remove);
});

export default routes;
