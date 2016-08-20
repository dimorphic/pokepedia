// deps
import express from 'express';
import logger from 'morgan';
// import { inspect } from './helpers';
// const debug = require('debug')('pokepedia:app');

// settings + routes
import CONFIG from './config';
import ROUTES from './routes';
import Database from './db';

// helpers
const UTILS = CONFIG.get('utils');

// @TODO
const DB = new Database({ path: `${UTILS.paths.data()}/pokedex/pokedex.en.build.json` });

// @DEBUG CONFIG
// console.log(CONFIG.get('paths'));
// Object.keys(utils.paths).forEach((path) => {
//   const fn = utils.paths[path];
//   console.log('path : ', fn());
// });
// process.exit(0);

// create Express app <3
const app = express();

// enable CORS
app.all('*', (req, res, next) => {
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Methods', 'GET');
  res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');

  next();
});

// add middleware enhancers
// app.use(logger('dev')); // http request logger
app.use(logger('[:date[clf]] [:method::status] :remote-addr @ :url [:response-time ms] (:res[content-length])'));

// static assets
// app.use(express.static(UTILS.paths.assets()));
// app.use('/assets', express.static(UTILS.paths.assets()));

// make DB accesible to router
app.use((req, res, next) => {
  req.db = DB;
  next();
});

// auto-mount routes
Object.keys(ROUTES).forEach((ROUTE) => app.use.call(app, '/', ROUTES[ROUTE]));

// catch 404 and forward to error handler
// app.use((req, res, next) => {
//   const err = new Error('Not Found');
//   err.status = 404;
//   next(err);
// });
//
// app.use((err, req, res, next) => {
//   res.status(err.status || 500);
//   // res.render('error', {
//   console.log('error', {
//     message: err.message,
//     error: err
//   });
// });

// expose
export default app;
