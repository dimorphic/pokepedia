// deps
import './utils/polyfills';
import React from 'react';
import { render } from 'react-dom';
import { Provider } from 'react-redux';
import createBrowserHistory from 'history/lib/createBrowserHistory';

// store
import setupStore from 'shared/store';
import routes from 'shared/routes';

// components
import Root from 'shared/containers/Root';

// global style ? (demo)
if (process.env.BROWSER) require('./scss/main.scss');

// setup
const preloadedState = window.__INITIAL_STATE__;
const history = createBrowserHistory();
const store = setupStore({ initialState: preloadedState, history });
const target = document.getElementById('root');

function renderApp() {
  render(
    <Provider store={store}>
      <Root routes={routes} history={history} />
    </Provider>
  , target);
}

// Render HTML on the browser
renderApp();

// Add redux devtools ?
if (__DEV__) {
  // require('./utils/devtools').default(store);
}

// @TODO: not working for now ?
// Use hot-reloading if available
if (module.hot) {
  module.hot.accept(() => renderApp());
}
