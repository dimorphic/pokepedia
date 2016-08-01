// deps
import React from 'react';
import { Route, IndexRoute } from 'react-router';

// containers
import App from 'containers/App';
import HomeView from 'views/HomeView';
import LocationView from 'views/LocationView';

const onCheckAuth = () => {
  console.log('ROUTE CHECK AUTH!!!');
  // const token = localStorage.getItem('authkey');
  // if (token) {
  //   store.dispatch(authActions.loginViaToken(token));
  // }
};

const routes = (
  <Route path="/" component={App}>
    <IndexRoute component={HomeView} />

    <Route path="location" component={LocationView} />
  </Route>
);

export default routes;
