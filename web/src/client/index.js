// deps
import './polyfills';
import React from 'react';
import { render } from 'react-dom';
import { Provider } from 'react-redux';
import createBrowserHistory from 'history/lib/createBrowserHistory';

// store
import setupStore from 'shared/store';
import routes from 'shared/routes';

// components
import Root from 'shared/containers/Root';

// setup
const history = createBrowserHistory();
const preloadedState = window.__INITIAL_STATE__;
const store = setupStore({ initialState: preloadedState, history });

render(
  <Provider store={store}>
    <Root routes={routes} history={history} />
  </Provider>,
  document.getElementById('root')
);
