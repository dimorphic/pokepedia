// deps
import path from 'path';

// support .env ?
// import dotenv from 'dotenv';
// dotenv.load();

//
//  CONFIG
//
const CONFIG = new Map();

// environment
CONFIG.set('env', process.env.NODE_ENV);
CONFIG.set('HOST', '0.0.0.0'); // bind to all interfaces
CONFIG.set('PORT', 9090); // app port

// app paths
CONFIG.set('paths', {
  project: path.resolve(__dirname, '../'),
  source: 'src',
  build: 'build',

  shared: '../shared',
  assets: '../shared/assets',
  data: '../shared/data'
});

//
//  UTILS
//
const paths = (() => {
  const base = [CONFIG.get('paths').project];
  const resolve = path.resolve;

  const project = (...args) => resolve.apply(resolve, [...base, ...args]);

  return {
    project,
    source: project.bind(null, CONFIG.get('paths').source),
    build: project.bind(null, CONFIG.get('paths').build),

    // @TODO: time to make this more dynamic?
    shared: project.bind(null, CONFIG.get('paths').shared),
    assets: project.bind(null, CONFIG.get('paths').assets),
    data: project.bind(null, CONFIG.get('paths').data)
  };
})();

CONFIG.set('utils', { paths });

// expose
module.exports = CONFIG;