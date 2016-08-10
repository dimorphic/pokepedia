import {pokemons as pokemonsController} from '../controllers';

const routes = ((app) => {
  app.get('/pokemons', pokemonsController.all);
  app.post('/pokemons/:id', pokemonsController.add);
  app.put('/pokemons/:id', pokemonsController.update);
  app.delete('/pokemons/:id', pokemonsController.remove);
});

export default routes;
