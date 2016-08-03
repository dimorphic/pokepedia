// #!/usr/bin/env node

// deps
import './polyfills';

// magic app!
import http from 'http';
import app from './app';

// settings
const PORT = (process.env.PORT || 9090);

// save port in app locals
app.set('port', PORT);

// create WEB server
const webserver = http.createServer(app);

// bind on all interfaces
webserver.listen(PORT); // 80 ?

// WEB server error handler
webserver.on('error', (error) => {
  if (error.syscall !== 'listen') { throw error; }

  // get bind type
  const bind = typeof PORT === 'string' ? `Pipe ${PORT}` : `Pipe ${PORT}`;

  // handle specific listen errors with friendly messages
  switch (error.code) {
    case 'EACCES':
      console.error(bind + ' requires elevated privileges');
      process.exit(1);
      break;

    case 'EADDRINUSE':
      console.error(bind + ' is already in use');
      process.exit(1);
      break;

    default:
      throw error;
  }
});

// WEB server online event
webserver.on('listening', () => {
  const addr = webserver.address();
  const bind = typeof addr === 'string' ? 'pipe ' + addr : 'port ' + addr.port;

  console.log('Listening on ' + bind);
});
