// app global config
import CONFIG from '../config';

// helpers
const UTILS = CONFIG.get('utils');

// loaders & plugins
const LOADERS = exports.LOADERS = require('./modules/loaders');
const PLUGINS = exports.PLUGINS = require('./modules/plugins');

// path exporter
const PATHS = exports.PATHS = {
  src: UTILS.paths.source(),
  build: UTILS.paths.build()
};

//
// remove server (SSR) deps #HACK
// @TODO: investigate more and remove this hack
// NOTE:
// Webpack picks them up for some reason, eventho not included in path :<
//  could move these deps to 'dev-deps' ?
//  ...but then we will not be able to do `$ npm i --production` if ever needed ?
//
const serverDeps = ['cross-env', 'express', 'morgan', 'nodemon', 'serve-favicon'];

function getAppVendorDeps() {
  return CONFIG.get('dependencies').vendor.filter((item) => {
    return !serverDeps.includes(item);
  });
}

// entry points
export const entry = {
  app: [
    `${PATHS.src}/client/index.js`
  ],

  vendor: getAppVendorDeps()
};

// build output destination
export const createOutput = (options) => Object.assign({
  path: PATHS.build,
  filename: '[name].bundle.js',
  publicPath: '/'
}, options);

// modules resolves
export const resolve = {
  root: [`${PATHS.src}`],

  extensions: ['', '.js', '.jsx', '.css', '.scss'],
  modulesDirectories: [
    `${PATHS.src}`,
    // `${PATHS.src}/scss`,

    // fallback
    'node_modules'
  ]
};
