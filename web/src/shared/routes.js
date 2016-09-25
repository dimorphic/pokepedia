import React from 'react';
import { Route, IndexRoute } from 'react-router';

import App from 'shared/containers/App';

import Home from 'shared/components/views/Home';
import Test from 'shared/components/views/Test';

//
// Asynchronously load a file
// @param main {String} - Main component
// @returns {Function}
//
// function requireAsync(container) {
//   return (location, cb) => {
//     require.ensure([], (require) => {
//       cb(null, require('shared/containers/' + container));
//     });
//   }
// }

export default (
  <Route path="/" component={App}>
    <IndexRoute component={Home} />
    <Route path="test" component={Test} />
  </Route>
);
