// deps
import logger from 'debug';
import express from 'express';
import compression from 'compression';
// import cors from 'cors';
// import favicon from 'serve-favicon';
import morgan from 'morgan';

// settings
import CONFIG from '../../config';
// import ROUTES from './routes';

// helpers
const UTILS = CONFIG.get('utils');

// sExpress <3
const app = express();

// Config
app.set('port', (process.env.PORT || CONFIG.get('PORT')));
app.disable('x-powered-by');
app.use(compression());
// app.use(cors());

console.log('assets @ ', UTILS.paths.assets());

// Serve static assets
// NOTE: off for now. Apache will serve assets for the moment
app.use(express.static(UTILS.paths.assets()));
app.use('/assets', express.static(UTILS.paths.assets()));

// Middlewares
// app.use(favicon(`${UTILS.paths.assets()}/pokepedia-favicon.png`));

// HTTP request logger
// app.use(logger('dev')); // http request logger
app.use(morgan('[:date[clf]] [:response-time ms] :remote-addr - ":method @ :url HTTP/:http-version" :status :res[content-length]'));
// app.use(morgan('[:date[clf]] [:method::status] :remote-addr @ :url [:response-time ms] (:res[content-length])'));

// Routes
app.use((req, res) => {
  res.sendStatus(200).end('ok');
});
// app.use(rendereror);

// Boot it up!
app.listen(app.get('port'), () => {
  console.log('Listening on ' + app.get('port'));
  logger('server:start')('Listening on @ ' + app.get('port'));
});
