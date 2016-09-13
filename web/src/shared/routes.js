import React from 'react';
import { Route, IndexRoute } from 'react-router';

import Html from './containers/Html';
import App from './containers/App';

export default (
  <Route component={Html}>
    <Route path="/" component={App} />
  </Route>
);
