// deps
import React from 'react';
import { renderToString } from 'react-dom/server';
import { match, RouterContext, Route } from 'react-router';
import { Provider } from 'react-redux';

import createLocation from 'history/lib/createLocation';
import createMemoryHistory from 'history/lib/createMemoryHistory';

// import fetchData from '../../shared/fetchData';
// import Context from '../../client/components/Common/Context'
// import Html from '../../client/components/Common/Html'

import setupStore from 'shared/store';
// import routes from '../../client/routes';

const App = (props) => {
  return (
    <div>
      <div>hello world</div>
      <div>{props.children}</div>
    </div>
  );
};

//
const routes = (
  <Route>
    <Route path="/" component={App} />
  </Route>
);

function renderComponent(renderProps, store) {
  const initialState = store.getState();

  const initialView = (
    <Provider store={store}>
      <RouterContext {...renderProps} />
    </Provider>
  );

  const componentHTML = renderToString(initialView);
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
        <script type="application/javascript" src="http://localhost:8888/build/app.bundle.js"></script>
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
  // create routing
  const location = createLocation(req.url);
  const history = createMemoryHistory();

  // Compile an initial state
  // let preloadedState = { counter: 0 };
  const store = setupStore({ routes, history });

  // response send helper
  function sendResponse(statusCode, content) {
    res.status(statusCode).send('<!DOCTYPE html>\n' + content);
  }

  match({ routes, location }, (err, redirectLocation, renderProps) => {
    console.log('!! HERE !!');

    if (err) {
      console.error(err);
      return res.status(500).end('Internal server error');
    }

    if (redirectLocation) {
      return res.redirect(302, redirectLocation.pathname + redirectLocation.search);
    }

    if (!renderProps) {
      return res.status(404).end('Not found');
    }

    console.log('!! YOYO !!');
    sendResponse(200, renderComponent(renderProps, store));
  });
}
