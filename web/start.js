// deps
const sourceMaps = require('source-map-support');
sourceMaps.install();

require('./src/shared/polyfills');
require('./src/shared/console');

// server rendereror!
require('babel-core/register');
require('./src/server/index');

// process.on('unhandledRejection', console.error.bind(console));

// Compile files on PROD or launch DEV server
if (process.env.NODE_ENV === 'production') {
  require('./webpack/webpack.production.js')
} else {
  require('./webpack/webpack.development.js')
}
