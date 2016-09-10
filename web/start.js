// deps
require('source-map-support').install();
require('babel-core/register');

// @DEBUG
const debug = require('debug');
debug.enable(`
  dev:*,
  web:*,
  server:*
`);

// Launch DEV server or compile files on PROD
if (!process.env.NODE_ENV || process.env.NODE_ENV === 'development') {
  // start dev server
  require('./webpack/dev-server.js');
}
 // else {
//   require('./webpack/prod.config.js');
// }
