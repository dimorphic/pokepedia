// deps
import { createStore, applyMiddleware, compose } from 'redux';
import { reduxReactRouter } from 'redux-router';

// middlewares
import thunkMiddleware from 'redux-thunk';
import promiseMiddleware from 'redux-promise-middleware';
import logger from './middlewares/logger';
import { DevTools } from 'client/utils/devtools';

// routes & reducers
import STATE from './initial-state';
import rootReducer from './reducers/index';
import routes from '../routes';

const { BROWSER } = process.env;

// expose le store
export let store;

export default function setupStore({ initialState = STATE, history }) {
  // middleware ehancers
  const middlewares = compose(
    applyMiddleware(
      thunkMiddleware,
      promiseMiddleware({ promiseTypeSuffixes: ['PENDING', 'SUCCESS', 'FAILED'] }),
      logger
      // Reactotron.reduxMiddleware
    ),

    reduxReactRouter({ routes, history })
  );

  // devtools ?
  const enhancers = BROWSER ? compose(
    middlewares,
    DevTools.instrument()
  ) : middlewares;

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
