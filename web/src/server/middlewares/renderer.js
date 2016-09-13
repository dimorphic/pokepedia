// deps
import React from 'react';
import { renderToString } from 'react-dom/server';
import { match, RouterContext, Route } from 'react-router';
import { Provider } from 'react-redux';

import createLocation from 'history/lib/createLocation';
import createMemoryHistory from 'history/lib/createMemoryHistory';

// import Html from '../../client/components/Common/Html'

import routes from 'shared/routes';
import setupStore from 'shared/store';

// const runRouter = (location, routes) => {
//   new Promise((resolve) => {
//     match({ routes, location }, (...args) => resolve(args));
// };

function renderComponent(renderProps, store) {
  const initialState = store.getState();

  const componentHTML = renderToString(
    <Provider store={store}>
      <RouterContext {...renderProps} />
    </Provider>
  );

  const HTML = `
    <!DOCTYPE html>
    <html>
      <head>
        <meta charset="utf-8">
        <title>Redux Demo</title>

        <script>
          window.__INITIAL_STATE__ = ${JSON.stringify(initialState)};
        </script>
      </head>
      <body>
        <div id="root">${componentHTML}</div>

        <script type="application/javascript" src="build/vendor.bundle.js"></script>
        <script type="application/javascript" src="build/app.bundle.js"></script>
      </body>
    </html>
  `;

  return HTML;
}

//
// Server-side renderer middleware
// @param req
// @param res
//
export default function render(req, res) {
  // create routing, store
  const location = createLocation(req.url);
  const history = createMemoryHistory();
  const store = setupStore({ routes, history });

  // response send helper
  function sendResponse(statusCode, content) {
    res.status(statusCode).send(`<!DOCTYPE html>\n${content}`);
  }

  match({ routes, location }, (err, redirectLocation, renderProps) => {
    console.log('!! HERE !!');

    if (err) {
      console.error(err);
      res.status(500).end('Internal server error');
    }

    if (redirectLocation) {
      res.redirect(302, redirectLocation.pathname + redirectLocation.search);
    }

    if (!renderProps) {
      console.warn('Not found ', location);
      res.status(404).end('Not found');
    }

    // ALL OK, RENDER REACT
    console.log('!! YOYO !! all ok. go render!');
    // return res.end('I ARE HERE!');
    sendResponse(200, renderComponent(renderProps, store));
  });
}
