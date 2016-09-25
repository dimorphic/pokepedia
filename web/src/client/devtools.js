// deps
import React from 'react';
import { render } from 'react-dom';
import { createDevTools } from 'redux-devtools';

import LogMonitor from 'redux-devtools-log-monitor';

export const DevTools = createDevTools(
  <LogMonitor theme="tomorrow" />
);

//
// Puts Redux DevTools into a separate window.
// Based on https://gist.github.com/tlrobinson/1e63d15d3e5f33410ef7#gistcomment-1560218.
//
export default function showDevTools(store) {
  const name = 'Redux DevTools';

  const popup = window.open(
    null,
    name,
    'menubar=no,location=no,resizable=yes,scrollbars=no,status=no,width=450,height=600'
  );

  if (!popup) {
    console.error(
      'Couldn\'t open Redux DevTools due to a popup blocker. ' +
      'Please disable the popup blocker for the current page.'
    );
    return;
  }

  // reload in case it's reusing the same window with the old content
  popup.location.reload();

  // set visible Window title
  popup.document.title = name;

  // wait a little bit for it to reload, then render
  setTimeout(() => {
    // wait for the reload to prevent:
    // "Uncaught Error: Invariant Violation:
    //  ..._registerComponent(...): Target container is not a DOM element."
    popup.document.write('<div id="react-devtools-root"></div>');

    render(
      <DevTools store={store} />,
      popup.document.getElementById('react-devtools-root')
    );
  }, 50);
}
