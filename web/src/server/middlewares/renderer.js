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

// const runRouter = (location, routes) => {
//   return new Promise((resolve) => {
//     match({ routes, location }, (...args) => { resolve(args); });
//   });
// };

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
// Server-side renderer middleware
// @param req
// @param res
//
export default function router(req, res) {
  // create routing
  const location = createLocation(req.originalUrl);
  const history = createMemoryHistory();

  // response send helper
  function sendResponse(statusCode, content) {
    res.status(statusCode).send(`<!DOCTYPE html>\n${content}`);
  }

  // @debug
  // const [ error, redirect, renderProps ] = await runRouter(location, routes);
  // console.log('>>>> ', error, redirect, renderProps);
  // if (error || redirect) throw ({ error, redirect })


  // GO MATCH ROUTE !
  match({ routes, location }, (err, redirectLocation, renderProps) => {
    // handle error
    if (err) {
      console.error(err);
      res.status(500).end('Internal server error');
    }

    // handle redirect
    if (redirectLocation) {
      res.redirect(302, redirectLocation.pathname + redirectLocation.search);
    }

    // pass this to react routes 404 ?
    if (!renderProps) {
      console.warn('Not found ', location);
      res.status(404).end('Not found');
    }

    //
    // ALL OK, RENDER REACT BRO !
    //

    // setup Redux store
    const store = setupStore({ history });

    // fetch all containers needs (action promises)
    fetchComponentData(store.dispatch, renderProps.components, renderProps.params)
    .then(() => {
      const html = renderReact(renderProps, store);
      return html;
    })
    .then((html) => {
      console.debug('return html content');
      sendResponse(200, html);
    });

    // console.info('render store @ ', store.getState());
  });
}
