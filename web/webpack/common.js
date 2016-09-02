// app global config
import CONFIG from '../config';

// helpers
const UTILS = CONFIG.get('utils');

// path exporter
const PATHS = exports.PATHS = {
  src: UTILS.paths.source(),
  build: UTILS.paths.build()
};

// loaders & plugins
const LOADERS = exports.LOADERS = require('./loaders');
const PLUGINS = exports.PLUGINS = require('./plugins');

// entry points
export const entry = {
  app: [
    `${PATHS.src}/index.js`
  ]
  // vendor: CONFIG.get('dependencies').vendor
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
