// deps
// import 'babel-core/polyfill';
import React from 'react';
import { render } from 'react-dom';

import Root from './containers';
import * as LocationActions from './actions/location';

// global style ? (demo)
import './scss/main.scss';

// store & routes
import setupStore from './store';

// setup store
const store = setupStore();
const target = document.getElementById('root');

const node = (
  <Root store={store} />
);


store.dispatch(LocationActions.loadMap('lolz'));

render(node, target);
// render(<Root />, document.getElementById('root'));
