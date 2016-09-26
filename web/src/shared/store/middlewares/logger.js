//
//  Logger middleware for debugging purposes
//  @param  {Function} getState
//  @return {Object} new state
//
const { BROWSER } = process.env;

// use localStorage keys for toggling logger
// ...this way we can debug in PRODUCTION mode also if needed
const isLogActive = BROWSER ? localStorage.getItem('logger-middleware') : false;
const isLogCollapsed = BROWSER ? localStorage.getItem('logger-middleware-collapsed') : false;

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
  console.groupEnd(...msg);
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
