// deps
import React, { Component } from 'react';
import { Provider } from 'react-redux';
import { ReduxRouter } from 'redux-router';

// routes
import routes from '../routes';

export default class Root extends Component {
  static propTypes = {
    store: React.PropTypes.object.isRequired
  };

  render() {
    return (
      <div>
        <Provider store={this.props.store}>
          <div>
            <ReduxRouter>
                {routes}
            </ReduxRouter>
          </div>
        </Provider>
      </div>
    );
  }
}
