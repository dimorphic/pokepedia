//
//  Logger middleware for debugging purposes
//  @param  {Function} getState
//  @return {Object} new state
//

// use localStorage keys for toggling logger
// ...this way we can debug in PRODUCTION mode also if needed
const isLogActive = localStorage.getItem('logger-middleware');
const isLogCollapsed = localStorage.getItem('logger-middleware-collapsed');

// helpers
const formatTime = (time) => {
  return `${time.getHours()}:${time.getMinutes()}:${time.getSeconds()}.${time.getMilliseconds()}`;
};

const consoleRender = (msg, action, state) => {
  if (isLogCollapsed === 'true') {
    console.group(...msg);
  } else {
    console.groupCollapsed(...msg);
  }

  console.log('>> Action: ', action);
  console.log('<< Next state:', state);
  console.groupEnd();
};

// Logger
export default function logger({ getState }) {
  // state mutations tracker
  let MUTATIONS = 0;

  return (next) => (action) => {
    const date = new Date();
    const msg = ['DISPATCH #', MUTATIONS, action.type, `@ ${formatTime(date)}`];

    const result = next(action);
    MUTATIONS++;

    if (isLogActive === 'true') {
      consoleRender(msg, action, getState());
    }

    return result;
  };
}
