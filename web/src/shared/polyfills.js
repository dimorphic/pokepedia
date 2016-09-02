// deps
require('es6-promise').polyfill();
require('babel-polyfill');

if (typeof window !== 'undefined') {
  const injectTapEventPlugin = require('react-tap-event-plugin');
  injectTapEventPlugin(); // Needed for onTouchTap (http://stackoverflow.com/a/34015469/988941)
}
