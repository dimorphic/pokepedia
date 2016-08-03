// deps
import './polyfills';
import React from 'react';
import { render } from 'react-dom';

// container, store & actions
import Root from './containers';
import setupStore from './store';
import * as LocationActions from './actions/location';

// global style ? (demo)
import './scss/main.scss';

// setup store
const store = setupStore();
const target = document.getElementById('root');
const node = (
  <Root store={store} />
);

// test
store.dispatch(LocationActions.loadMap('lolz'));

// render it!
render(node, target);
