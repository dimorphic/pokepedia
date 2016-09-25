// deps
import { createStore, applyMiddleware, compose } from 'redux';
import { reduxReactRouter } from 'redux-router';

// middlewares
import thunkMiddleware from 'redux-thunk';
// import promiseMiddleware from 'redux-promise-middleware';
// import logger from './middlewares/logger';
import { DevTools } from 'client/devtools';

// routes & reducers
import STATE from './initial-state';
import rootReducer from './reducers';
import routes from '../routes';

const { BROWSER } = process.env;
console.log('I ARE BROWSER @ ', BROWSER);

// expose le store
export let store;

export default function setupStore({ initialState = STATE, history }) {
  // middleware ehancers
  const enhancers = compose(
    applyMiddleware(
      thunkMiddleware,
      // promiseMiddleware({ promiseTypeSuffixes: ['PENDING', 'SUCCESS', 'FAILED'] }),
      // logger
    ),

    reduxReactRouter({ routes, history }),
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
