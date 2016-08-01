// deps
import { createStore, applyMiddleware, compose } from 'redux';
import { reduxReactRouter } from 'redux-router';
import { createHistory } from 'history';

// middlewares
import thunkMiddleware from 'redux-thunk';
import promiseMiddleware from 'redux-promise-middleware';
import logger from './middlewares/logger';
// import Reactotron from 'reactotron';

// routes & reducers
import STATE from './initial-state';
import routes from '../routes';
import rootReducer from './reducers';

// middleware enhancers
// const middlewares = [
//   thunkMiddleware,
//   promiseMiddleware({ promiseTypeSuffixes: ['PENDING', 'SUCCESS', 'FAILED'] }),
//   reduxReactRouter({ routes, createHistory }),
//   logger
//   // Reactotron.reduxMiddleware
// ];

// middlewares
const middlewares = applyMiddleware(
  thunkMiddleware,
  promiseMiddleware({ promiseTypeSuffixes: ['PENDING', 'SUCCESS', 'FAILED'] }),
  logger
);

// enhance store creator
const enhanceStore = compose(
  middlewares,
  reduxReactRouter({ routes, createHistory })
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
      const nextRootReducer = require('./reducers/index');
      store.replaceReducer(nextRootReducer);
    });
  }

  // Reactotron.addReduxStore(store);
  return store;
}
