import debug from 'debug';
import cp from 'child_process';
import path from 'path';
import watch from 'node-watch';
import browserSync from 'browser-sync';

// config
import SERVER_CONFIG from '../../src/server/config';
import CONFIG from '../../config';

// helpers
function noop() {}
const SERVER_SRC = path.join(__dirname, '../../src');
const SERVER_APP = `${SERVER_SRC}/server/index`;

//
//  'Middleware' plugin to start our Express app
//
let server;
let started;
let serverReload;

const WEBPACK_PORT = CONFIG.get('port'); // default: 8001
const BROWSER_SYNC_CONFIG = {
  port: 8080, // WEBPACK_PORT + 2 || 8002,
  proxy: `0.0.0.0:${SERVER_CONFIG.web.port}`
};

const startServer = () => {
  // Define `restartServer`
  const restartServer = () => {
    debug('dev')('restarting express application');

    serverReload = true;
    server.kill('SIGTERM');

    return startServer();
  };

  // merge env for the new process
  const env = {
    ...process.env,
    NODE_ENV: 'development',
    BABEL_ENV: 'server'
  };

  // start the server procress
  server = cp.fork(SERVER_APP, { env });

  // when server is `online`
  server.once('message', (message) => {
    if (message.match(/^online$/)) {
      if (serverReload) {
        serverReload = false;
        debug('dev:browsersync')('?? BROWSER SYNC RELOAD ??');
        browserSync.reload();
      }

      if (!started) {
        started = true;

        // Start browserSync
        debug('dev:browsersync')('!! START BROWSER SYNC !!');
        browserSync(BROWSER_SYNC_CONFIG);

        // Listen for `rs` in stdin to restart server
        debug('dev')('type `rs` in console for restarting web application');

        process.stdin.setEncoding('utf8');
        process.stdin.on('data', (data) => {
          const parsedData = `${data}`.trim().toLowerCase();
          if (parsedData === 'rs') restartServer();
        });

        // Start watcher on server files
        // and reload browser on change
        debug('dev:watcher')('?? START WATCHER ??');

        watch(
          [
            `${SERVER_SRC}/server`,
            `${SERVER_SRC}/shared`
          ],
          (file) => {
            debug('dev:watcher')('watch file @ ', file);
            return !file.match('webpack-stats.json') ? restartServer() : noop();
          }
        );
      }
    }
  });
};

// kill server on exit
process.on('exit', () => server.kill('SIGTERM'));
export default () => { return !server ? startServer() : noop(); };
