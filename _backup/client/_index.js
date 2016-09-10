// deps
import './polyfills';
import React from 'react';
import { render } from 'react-dom';

// container, store & actions
import Root from './containers';
import setupStore from './store';

// global style ? (demo)
import './scss/main.scss';

// setup store
const store = setupStore();
const target = document.getElementById('root');

// test
// store.dispatch(LocationActions.loadMap('lolz'));

// render it!
// render(node, target);

function renderApp() {
  render(<Root store={store} />, target);
}

// Render HTML on the browser
renderApp();

// Use hot-reloading if available
if (module.hot) {
  module.hot.accept(() => renderApp());
}
