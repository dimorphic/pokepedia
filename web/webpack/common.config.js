// app global config
import ENV_CONFIG from '../config';

// helpers
const UTILS = ENV_CONFIG.get('utils');
const PATHS = UTILS.paths;

// loaders & plugins
const LOADERS = exports.LOADERS = require('./modules/loaders');
const PLUGINS = exports.PLUGINS = require('./modules/plugins');

//
// remove server (SSR) deps #HACK
// @TODO: investigate more and remove this hack
// NOTE:
// Webpack picks them up for some reason, eventho not included in path :<
//  could move these deps to 'dev-deps' ?
//  ...but then we will not be able to do `$ npm i --production` if ever needed ?
//
const IGNORE_DEPS = [
  'cross-env', 'express', 'morgan', 'nodemon', 'serve-favicon', 'fs', 'path'
];

function getAppVendorDeps() {
  return ENV_CONFIG.get('dependencies').vendor.filter((item) => {
    return !IGNORE_DEPS.includes(item);
  });
}

// entry points
export const entry = {
  app: [
    `${PATHS.source()}/client/index.js`
  ],

  vendor: getAppVendorDeps()
};

// console.log('WEBPACK COMMON ENTRY: ', entry);

// build output destination
export const createOutput = (options) => Object.assign({
  path: PATHS.build(),
  filename: '[name].bundle.js',
  publicPath: '/'
}, options);

// modules resolves
export const resolve = {
  root: [`${PATHS.source()}`],

  extensions: ['', '.js', '.jsx', '.css', '.scss'],
  modulesDirectories: [
    `${PATHS.source()}`,
    // `${PATHS.source()}/assets`,

    // fallback
    'node_modules'
  ]
};
