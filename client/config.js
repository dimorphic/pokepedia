// deps
// import path from 'path';
// import jsonfile from 'jsonfile';
const path = require('path');
const jsonfile = require('jsonfile');

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
CONFIG.set('env', process.env.NODE_ENV);
CONFIG.set('HOST', '0.0.0.0');
CONFIG.set('PORT', 8080);

// app paths
CONFIG.set('paths', {
  project: path.resolve(__dirname, './'),
  source: 'src',
  build: 'dist'
});

// app dependencies
CONFIG.set('dependencies', {
  vendor: Object.keys(APP_PACKAGE.dependencies)
});

// globals
CONFIG.set('globals', {
  'process.env': {
    'NODE_ENV': JSON.stringify(CONFIG.get('env'))
  },

  'NODE_ENV': CONFIG.get('env'),
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
    build: project.bind(null, CONFIG.get('paths').build)
  };
})();

CONFIG.set('utils', { paths });

// expose
module.exports = CONFIG;
