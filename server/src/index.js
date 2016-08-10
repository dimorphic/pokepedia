'use strict';

import './polyfills';

import express from 'express';
import bodyParser  from 'body-parser';
import mongoose from 'mongoose';
import cors from 'cors';
import path from 'path';
import logger from 'morgan';
import http from 'http';

import dbUrl from './config/database';
import routes from './routes/routes';
const mongoOptions = { db: { safe: true } };

const app = express();

app.set('port', process.env.PORT || 8800);

app.use(cors());

app.use(bodyParser.json());

app.use(logger('dev'));

app.db = mongoose.connect(dbUrl, mongoOptions, function (err, res) {
  if (err) {
    console.log('ERROR connecting to: ' + dbUrl + '. ' + err);
  } else {
    console.log('Successfully connected to: ' + dbUrl);
  }
});

app.get('/', function (req, res) {
  res.send('Hello! The Pokemon API is at http://localhost:' + app.get('port'));
});

routes(app);

var server = http.createServer(app);

server.listen(app.get('port'), function () {
  console.log('Express server listening on port ' + app.get('port'));
});

