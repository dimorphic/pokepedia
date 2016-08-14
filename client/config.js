// deps
import path from 'path';
import jsonfile from 'jsonfile';

// support .env ?
// import dotenv from 'dotenv';
// const dotenv = rquire('dotenv');
// dotenv.load();

// get APP package.json config
const APP_PACKAGE = jsonfile.readFileSync('package.json');

//
//  CONFIG
//
const CONFIG = new Map();

// environment
CONFIG.set('env', process.env.NODE_ENV || 'development');
CONFIG.set('HOST', '0.0.0.0'); // bind to all interfaces
CONFIG.set('PORT', 8080); // webpack dev server

// app paths
CONFIG.set('paths', {
  project: path.resolve(__dirname, './'),
  source: 'src',
  build: 'build',

  shared: '../shared',
  assets: '../shared/assets',
  data: '../shared/data'
});

// app dependencies
CONFIG.set('dependencies', {
  vendor: Object.keys(APP_PACKAGE.dependencies)
});

// globals
CONFIG.set('globals', {
  'NODE_ENV': JSON.stringify(CONFIG.get('env')),
  'process.env': { 'NODE_ENV': JSON.stringify(CONFIG.get('env')) },

  '__DEV__': (CONFIG.get('env') === 'development'),
  '__PROD__': (CONFIG.get('env') === 'production')
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
