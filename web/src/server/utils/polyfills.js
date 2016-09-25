require('es6-promise').polyfill();
require('babel-polyfill');
require('./console');

// Needed for onTouchTap
// http://stackoverflow.com/a/34015469/988941
import injectTapEventPlugin from 'react-tap-event-plugin';
injectTapEventPlugin();
