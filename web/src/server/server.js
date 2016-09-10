// deps
import debug from 'debug';
import express from 'express';
import compression from 'compression';
import favicon from 'serve-favicon';
import morgan from 'morgan';

// settings
import CONFIG from './config';
// import renderer from './middlewares/renderer';

const HOST = (process.env.HOST || CONFIG.web.host);
const PORT = (process.env.PORT || CONFIG.web.port);

// @DEBUG
// debug.enable('*');

// sExpress <3
const app = express();

// Config
app.set('host', HOST);
app.set('port', PORT);
app.disable('x-powered-by');
app.use(compression());

// Serve static assets
// app.use(express.static(UTILS.paths.assets()));
// app.use('/assets', express.static(UTILS.paths.assets()));
// auto-mount static routes
if (Array.isArray(CONFIG.web.static)) {
  CONFIG.web.static.forEach(staticRoute => {
    debug('web:static')(staticRoute.path);
    app.use(staticRoute.url, express.static(staticRoute.path));
  });
}

// Middlewares
app.use(favicon(CONFIG.web.favicon));

// HTTP request logger
// app.use(logger('dev')); // http request logger
app.use(morgan('[:date[clf]] [:response-time ms] :remote-addr - ":method @ :url HTTP/:http-version" :status :res[content-length]'));

// Proxy asset folder to webpack development server in development mode
if (process.env.NODE_ENV === 'development') {
  // const WEBPACK_CONFIG = require('../../webpack/dev.config');

}


// if (process.env.NODE_ENV === 'development') {
//   const webpackConfig = require('./../webpack/dev.config');
//   const proxy = require('proxy-middleware')(`http://0.0.0.0:${webpackConfig.server.port}`);
//
//   app.use('/build', proxy);
// } else {
//   app.use('/build', express.static(path.join(__dirname, '../dist'), cacheOpts))))
// }

// if (process.env.NODE_ENV === 'development') {
//   const compiler = webpack(config);
//
//   app.use(dev(compiler, {
//     publicPath: WEBPACK_CONFIG.output.publicPath, // '/build/',
//     historyApiFallback: true,
//     hot: true,
//
//     stats: {
//       colors: true,
//       hash: true,
//       timings: true,
//       version: false,
//       chunks: false,
//       modules: false,
//       children: false,
//       chunkModules: true
//     }
//   }));
//
//   app.use(hot(compiler, {
//     path: '/build/__webpack_hmr',
//     log: console.log
//   });
// }

// Routes
app.use((req, res) => {
  res.end('okzzy');
});

// React renderer
// app.use('*', renderer);

// Boot it up!
app.listen(PORT, HOST, () => {
  debug('web:start')(`⚡⚡⚡  Listening @ http://${app.get('host')}:${app.get('port')}`);
});

// Tell parent process that we started
if (process.send) process.send('online');
