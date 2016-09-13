process.env.BABEL_ENV = 'browser';
process.env.NODE_ENV = 'development';

// deps
import debug from 'debug';
import express from 'express';
import webpack from 'webpack';
import devMiddleware from 'webpack-dev-middleware';
import hotMiddleware from 'webpack-hot-middleware';

// helpers
import '../src/server/utils/console';
import startOurApp from './utils/start-web';

// configs
import ENV_CONFIG from '../config';
import WEBPACK_CONFIG from './dev.config';

// DEV SERVER
const app = express();
const PORT = ENV_CONFIG.get('PORT');

// 'middleware' to start our app
WEBPACK_CONFIG.plugins.push(function onLoad() {
  this.plugin('done', () => {
    debug('dev:webpack')('Bundle complete. Starting web app...');
    startOurApp();
  });
});

// start compiler
const compiler = webpack(WEBPACK_CONFIG);

// attach middlewares
app.use(devMiddleware(compiler, {
  publicPath: WEBPACK_CONFIG.output.publicPath, // '/build/',
  historyApiFallback: true,
  hot: true,

  stats: {
    colors: true,
    hash: true,
    timings: true,
    version: false,
    chunks: false,
    modules: false,
    children: false,
    chunkModules: true
  }
}));

app.use(hotMiddleware(compiler, {
  path: '/__webpack_hmr',
  log: console.log
}));

// Launch DEV server
app.listen(PORT, (err) => {
  if (err) { return console.error(err); }
  debug('dev:webpack')(`Dev server @ ${WEBPACK_CONFIG.output.publicPath}. Compiling...`);
});
