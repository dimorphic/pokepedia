// deps
import React from 'react';
import { Route, IndexRoute, IndexRedirect } from 'react-router';

// containers
import App from 'containers/App';
import HomeView from 'views/HomeView';
import PokedexView from 'views/PokedexView';
import LocationView from 'views/LocationView';

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
    <Route path="location" component={LocationView} />
  </Route>
);

export default routes;
