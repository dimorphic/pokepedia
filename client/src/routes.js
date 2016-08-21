// deps
import React from 'react';
import { Route, IndexRedirect } from 'react-router';

// containers
import App from 'containers/App';
import PokedexView from 'components/views/PokedexView';
// import PokemonView from 'components/views/PokemonView';
// import RewardsView from 'components/views/RewardsView';

// @TODO
const onCheckAuth = () => {
  console.log('ROUTE CHECK AUTH!!!');
  // const token = localStorage.getItem('authkey');
  // if (token) {
  //   store.dispatch(authActions.loginViaToken(token));
  // }
};

const routes = (
  <Route component={App}>
    <IndexRedirect to="/" />

    <Route path="/" component={PokedexView} />

    {/* TODO */}
    {/*
    <Route
      path="pokemon"
      onEnter={(nextState, replace) => {
        if (nextState.location.pathname === '/pokemon') {
          replace('/');
        }
      }}
    >
      <Route path=":pokemonId" component={PokemonView} />
    </Route>

    <Route path="/rewards" component={RewardsView} />
    */}
  </Route>
);

export default routes;
