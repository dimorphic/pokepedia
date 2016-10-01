// deps
import React from 'react';
import { renderToString, renderToStaticMarkup } from 'react-dom/server';
import { match, RouterContext } from 'react-router';
import { Provider } from 'react-redux';
import createLocation from 'history/lib/createLocation';
import createMemoryHistory from 'history/lib/createMemoryHistory';
import Helmet from 'react-helmet';

// routes & store
import routes from 'shared/routes';
import setupStore from 'shared/store';

import fetchComponentData from 'shared/utils/fetchComponentData';

// components
import Html from 'shared/containers/Html';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';

function matchLocation(location) {
  return new Promise((resolve) => {
    match({ routes, location }, (...args) => { resolve(args); });
  });
}

function renderReact(componentProps, store) {
  // root component
  const componentHTML = renderToString(
    <Provider store={store}>
      <MuiThemeProvider>
        <RouterContext {...componentProps} />
      </MuiThemeProvider>
    </Provider>
  );

  // assets are found in client 'webpack-stats.json'
  const assets = require('client/webpack-stats.json');

  // do NOT cache assets in dev mode
  if (process.env.NODE_ENV === 'development') {
    delete require.cache[require.resolve('client/webpack-stats.json')];
  }

  const initialState = store.getState();
  const head = Helmet.rewind();

  return renderToStaticMarkup(
    <Html
      head={head}
      body={componentHTML}
      assets={assets}
      initialState={initialState}
    />
  );
}

//
//  Server-Side Renderer middleware
//  @param req
//  @param res
//
export default function router(req, res) {
  // create routing
  const location = createLocation(req.originalUrl);
  const history = createMemoryHistory();

  // response send helper
  function sendResponse(statusCode, content) {
    res.status(statusCode).send(`<!DOCTYPE html>\n${content}`);
  }

  // GO MATCH ROUTE !
  // const [err, redirectLocation, renderProps] = await matchLocation(location);

  match({ routes, location }, (err, redirectLocation, renderProps) => {
    // handle error
    if (err) {
      console.error('LOCATION MATCH ERROR');
      console.error(err);
      return res.status(500).end('Server oops!');
    }

    // handle redirect
    if (redirectLocation) {
      return res.redirect(302, redirectLocation.pathname + redirectLocation.search);
    }

    // handle 404 (either return for server error, or passthru to react-router?)
    if (!renderProps) {
      console.warn('No route for: ', location.pathname);
      return res.status(404).end('Not found');
    }

    //
    //  ALL OK, RENDER REACT BRO !
    //
    // setup store
    const store = setupStore({ history });

    // fetch all containers needs (action promises)
    fetchComponentData(store.dispatch, renderProps.components, renderProps.params)
    .then(() => {
      const html = renderReact(renderProps, store);
      sendResponse(200, html);
    })
    .catch(fetchError => {
      console.warn('FETCH COMPONENT DATA ERROR');
      console.error(fetchError);
      res.end(fetchError.message);
    });
  });
}
