// deps
import React from 'react';
import { Route, IndexRedirect } from 'react-router';

// containers
// import App from './containers/App';
// import NotFound from 'containers/NotFound';

// import PokedexView from 'components/views/PokedexView';
// import PokemonView from 'components/views/PokemonView';
// import RewardsView from 'components/views/RewardsView';

//
// Asynchronously load a file
// @param main {String} - Main component
// @returns {Function}
//
function requireAsync(container) {
  return (location, next) => {
    next(null, require('./containers/' + container));
  };
}

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
    <Route path="/" component={requireAsync('PokedexView')} />

    {/* REWARDS */}
    <Route
      path="rewards"
      onEnter={(nextState, replace) => {
        const pathname = nextState.location.pathname.split('/');

        if (!pathname.includes('level') && !pathname.includes('egg')) {
          replace('/rewards/level');
        }
      }}
    >
      <Route path=":type" component={requireAsync('RewardsView')} />
    </Route>

    {/* TODO: Pokemon detail view */}
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
    */}

    {/* FALLBACKS */}
    <Route
      path="*"
      onEnter={(nextState, replace) => {
        // redirect to index
        replace('/');
      }}
    />
    {/* <Route path="*" component={requireAsync('NotFound')} /> */}
  </Route>
);

export default routes;
