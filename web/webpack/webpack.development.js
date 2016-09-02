// deps
import fs from 'fs';
import logger from 'debug';
import express from 'express';
import webpack from 'webpack';
import webpackDevMiddleware from 'webpack-dev-middleware';
import webpackHotMiddleware from 'webpack-hot-middleware';

// webpack common config
import * as common from './common';

// app global config
import CONFIG from '../config';

// web / dev server settings
const HOST = CONFIG.get('HOST'); // bind on all interfaces (use 'localhost' for privacy)
const PORT = CONFIG.get('PORT');

// Add HMR
const HMR = 'webpack-hot-middleware/client?path=/build/__webpack_hmr';
common.entry.app.unshift(HMR);
// common.entry.vendor.unshift(HMR);

function getExternals() {
  const nodeModules = {};

  fs.readdirSync('node_modules')
  .filter((x) => {
    return ['.bin'].indexOf(x) === -1;
  })
  .forEach((mod) => {
    nodeModules[mod] = `commonjs ${mod}`;
  });

  return nodeModules;
}

// console.log('EXTERNALS @ ', getExternals());

//
//  DEVELOPMENT config
//
const WEBPACK_CONFIG = {
  node: {
    global: true,
    fs: 'empty'
  },

  target: 'web',
  devtool: 'cheap-module-source-map', // 'eval-source-map'

  context: common.PATHS.src,

  entry: common.entry,
  output: common.createOutput({
    publicPath: `http://${HOST}:2002/build/`,
    libraryTarget: 'var'
    // pathinfo: true
  }),

  // externals: getExternals(),

  // devServer: {
  //   host: HOST,
  //   port: PORT,
  //
  //   contentBase: common.PATHS.src,
  //   historyApiFallback: true,
  //
  //   hot: true,
  //   inline: true,
  //   progress: true,
  //
  //   stats: {
  //     colors: true,
  //     version: false,
  //     timings: true
  //   }
  // },

  eslint: {
    configFile: '.eslintrc.js',
    quiet: true
    // failOnWarning: false,
    // failOnError: false
  },

  module: {
    preLoaders: [
      {
        test: /\.js$|.jsx$/,
        loader: 'eslint-loader',
        exclude: /node_modules/
      }
    ],

    loaders: [
      common.LOADERS.jsLoader({ include: common.PATHS.src }),
      common.LOADERS.jsonLoader({ include: common.PATHS.src }),
      common.LOADERS.sassLoader(),
      common.LOADERS.imagesLoader(),
      common.LOADERS.htmlLoader()
    ]
  },

  plugins: [
    common.PLUGINS.definePlugin(CONFIG.get('globals')),
    common.PLUGINS.occurenceOrderPlugin,
    common.PLUGINS.hotModulePlugin,
    common.PLUGINS.commonsChunkPlugin({
      name: 'vendor',
      filename: '[name].bundle.js'
    })
    // common.PLUGINS.htmlPlugin()
  ],

  resolve: common.resolve,
  postcss: common.PLUGINS.postcss
};

// Run DEV server for hot-reloading
//---------------------------------
const app = express();
const compiler = webpack(WEBPACK_CONFIG);
const port = 2002;

app.use(webpackDevMiddleware(compiler, {
  hot: true,
  publicPath: '/build/',
  historyApiFallback: true,

  stats: {
    colors: true,
    timings: true,
    hash: false,
    // timings: false,
    version: false,
    chunks: false,
    modules: false,
    children: false,
    chunkModules: false
  }
}));

app.use(webpackHotMiddleware(compiler, {
  path: '/build/__webpack_hmr',
  log: console.log
}));

// Launch DEV server
//-------------------------------
app.listen(port, 'localhost', (err) => {
  if (err) return console.error(err);

  logger('server:webpack')('Running on port ' + port);
});
