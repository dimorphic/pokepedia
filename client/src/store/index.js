// deps
import { createStore, applyMiddleware, compose } from 'redux';
import { reduxReactRouter } from 'redux-router';
import { createHistory } from 'history';

// middlewares
import thunkMiddleware from 'redux-thunk';
import promiseMiddleware from 'redux-promise-middleware';
import logger from './middlewares/logger';

// @TODO: devtools or reactotron ?
import DevTools from '../containers/DevTools';
// import Reactotron from 'reactotron';

// routes & reducers
import STATE from './initial-state';
import rootReducer from './reducers';
import routes from '../routes';

// expose le store
export let store;

export default function setupStore(initialState = STATE) {
  // middleware ehancers
  const enhancers = compose(
    applyMiddleware(
      thunkMiddleware,
      promiseMiddleware({ promiseTypeSuffixes: ['PENDING', 'SUCCESS', 'FAILED'] }),
      logger
    ),

    reduxReactRouter({ routes, createHistory }),
    DevTools.instrument()
  );

  // create enhanced store
  store = createStore(rootReducer, initialState, enhancers);

  // Enable Webpack hot module replacement for reducers
  if (module.hot) {
    console.log('!!! HOT RELOAD REDUCERS !!!');

    module.hot.accept('./reducers', () => {
      const nextRootReducer = require('./reducers/index');
      store.replaceReducer(nextRootReducer);
    });
  }

  // Reactotron.addReduxStore(store);
  return store;
}
