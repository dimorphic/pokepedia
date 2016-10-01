import React from 'react';
import { Route, IndexRedirect } from 'react-router';

import App from 'shared/containers/App';
import Error404 from 'shared/containers/404';

import Home from 'shared/components/views/Home';
import Test from 'shared/components/views/Test';

import PokedexView from 'shared/components/views/PokedexView';
import PokemonView from 'shared/components/views/PokemonView';
import RewardsView from 'shared/components/views/RewardsView';

//
// Asynchronously load a file
// @param main {String} - Main component
// @returns {Function}
//
// function requireAsync(container) {
//   return (location, cb) => {
//     require.ensure([], (require) => {
//       cb(null, require(`shared/components/views/${container}`));
//     });
//   };
// }

// function requireAsync(container) {
//   return (location, cb) => {
//     cb(null, require(`shared/components/views/${container}`));
//   };
// }

export default (
  <Route component={App}>
    <IndexRedirect to="/" />
    <Route path="/" component={PokedexView} />

    {/* TEST */}
    <Route path="home" component={Home} />
    <Route path="test" component={Test} />

    {/* POKEMON DETAILS */}
    <Route
      path="pokemon"
      onEnter={(nextState, replace) => {
        if (nextState.location.pathname === '/pokemon') {
          // replace('/');
          console.info('NO :pokemonId param. Redirect to / ?');
        }
      }}
    >
      <Route path=":pokemonId" component={PokemonView} />
    </Route>

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
      <Route path=":type" component={RewardsView} />
    </Route>

    {/* FALLBACKS */}
    <Route
      path="*"
      onEnter={(nextState, replace) => {
        // redirect to index
        console.warn(`No route : ${nextState.location.pathname}. Redirecting to / ...`);
        // replace('/');
      }}

      component={Error404}
    />
  </Route>
);
