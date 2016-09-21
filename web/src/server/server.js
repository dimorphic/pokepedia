// deps
import debug from 'debug';
import express from 'express';
import compression from 'compression';
import favicon from 'serve-favicon';
import morgan from 'morgan';

// settings
import CONFIG from './config';

// middlewares
import context from './middlewares/context';
import renderer from './middlewares/renderer';

// @DEBUG
// debug.enable('*');

// sExpress <3
const HOST = (process.env.HOST || CONFIG.web.host);
const PORT = (process.env.PORT || CONFIG.web.port);
const app = express();

// Config
app.set('host', HOST);
app.set('port', PORT);
app.disable('x-powered-by');
app.use(compression());

// Serve static assets
// app.use(CONFIG.web.static.assets);
app.use('/assets', express.static(CONFIG.web.static.assets.path));
app.use(favicon(CONFIG.web.favicon));

// auto-mount static routes
// if (Array.isArray(CONFIG.web.static)) {
//   CONFIG.web.static.forEach(staticRoute => {
//     debug('web:static')(staticRoute.path);
//     app.use(staticRoute.url, express.static(staticRoute.path));
//   });
// }

// Middlewares

// HTTP request logger
app.use(morgan('[:date[clf]] :remote-addr - ":method @ :url HTTP/:http-version" :status :res[content-length] [:response-time ms]'));

// Proxy asset folder to webpack development server in development mode
if (process.env.NODE_ENV === 'development') {
  const ENV_CONFIG = require('../../config');
  const WEBPACK_SERVER = `http://0.0.0.0:${ENV_CONFIG.get('PORT')}`;

  const proxy = require('proxy-middleware')(WEBPACK_SERVER);

  debug('web:static-proxy')(`Proxy to webpack dev server @ ${WEBPACK_SERVER}`);
  app.use('/build', proxy);
}
// } else {
//   app.use('/build', express.static(path.join(__dirname, '../dist'), cacheOpts))))
// }

// Routes
// app.use((req, res) => {
//   res.end('okzzy');
// });

// React renderer
app.use(context);
app.use('*', renderer);

// Boot it up!
app.listen(PORT, HOST, () => {
  debug('web:start')(`⚡⚡⚡  Development server @ http://${app.get('host')}:${app.get('port')}`);
});

// Tell parent process that we started
if (process.send) process.send('online');
