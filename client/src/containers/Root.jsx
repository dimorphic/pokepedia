// deps
import React, { Component } from 'react';
import { Provider } from 'react-redux';
import { ReduxRouter } from 'redux-router';

// components
import DevTools from './DevTools';

// routes
import routes from '../routes';

const devtoolsActive = (localStorage.getItem('devtools') === 'true');

export default class Root extends Component {
  static propTypes = {
    store: React.PropTypes.object.isRequired
  };

  render() {
    const devTools = devtoolsActive ? <DevTools /> : null;

    return (
      <div>
        <Provider store={this.props.store}>
          <div>
            <ReduxRouter>
                {routes}
            </ReduxRouter>
            {devTools}
          </div>
        </Provider>
      </div>
    );
  }
}
