// source maps bitch!
require('source-map-support').install();

// env settings
process.env.NODE_ENV = process.env.NODE_ENV || 'development';
delete process.env.BROWSER; // if present

// tell `require` calls to look into `/app`
// also it will avoid `../../../../../` require strings
// process.env.NODE_PATH = './src';
// require('module').Module._initPaths();

// ES6 hook & other polyfills
require('babel-core/register');
require('./utils/polyfills');

// Otherwise errors thrown in Promise routines will be silently swallowed.
// (e.g. any error during rendering the app server-side!)
process.on('unhandledRejection', console.error.bind(console));
// process.on('unhandledRejection', (reason, p) => {
//   if (reason.stack) {
//     console.error(reason.stack);
//   } else {
//     console.error('Unhandled Rejection at: Promise ', p, ' reason: ', reason);
//   }
// });

// Boot our server!
require('./server');
