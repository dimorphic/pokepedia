// only in Node
if (typeof window === 'undefined') {
  console.log('CONSOLE SHIM! ');

  // logging domain
  const APP_NAME = 'web';

  // enable logs output
  process.env.DEBUG = `${APP_NAME}:*,server:*`;
  // process.env.DEBUG = '*';

  // let's add some colors to our console.
  const logger = require('debug');

  const debug = logger(`${APP_NAME}:debug`);
  const error = logger(`${APP_NAME}:error`);
  const info = logger(`${APP_NAME}:info`);
  const warn = logger(`${APP_NAME}:warn`);

  // rebind
  console.debug = debug.bind(console);
  console.error = error.bind(console);
  console.info = info.bind(console);
  console.warn = warn.bind(console);
}
