// deps
import path from 'path';

// path settings
export const PATHS = exports.PATHS = {
  src: path.join(__dirname, '../src'),
  build: path.join(__dirname, '../dist')
};

// loaders & plugins
export const LOADERS = require('./loaders');
export const PLUGINS = require('./plugins');

// entry points
export const entry = [
  `${PATHS.src}/index.js`
];

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
