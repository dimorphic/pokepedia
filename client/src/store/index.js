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

// middlewares
const middlewares = applyMiddleware(
  thunkMiddleware,
  promiseMiddleware({ promiseTypeSuffixes: ['PENDING', 'SUCCESS', 'FAILED'] }),
  logger,
  // Reactotron.reduxMiddleware
);

// enhance store creator
const enhanceStore = compose(
  reduxReactRouter({ createHistory }),
  middlewares,
  DevTools.instrument()
);

// expose le store
export let store;
export default function setupStore(initialState = STATE) {
  // store = createStore(rootReducer, initialState, applyMiddleware(...middlewares));
  store = enhanceStore(createStore)(rootReducer, initialState);

  // Enable Webpack hot module replacement for reducers
  if (module.hot) {
    console.log('!!! HOT RELOAD REDUCERS !!!');

    module.hot.accept('./reducers', () => {
      const nextRootReducer = require('./reducers');
      store.replaceReducer(nextRootReducer);
    });
  }

  // Reactotron.addReduxStore(store);
  return store;
}
