// deps
import React, { Component } from 'react';
import { Provider } from 'react-redux';
import { ReduxRouter } from 'redux-router';

// components
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import DevTools from './DevTools';

// routes
import routes from '../routes';

// devtools for easy debugging
const devtoolsActive = (localStorage.getItem('devtools') === 'true');

export default class Root extends Component {
  static propTypes = {
    store: React.PropTypes.object.isRequired
  };

  render() {
    const devTools = devtoolsActive ? <DevTools /> : null;

    return (
      <MuiThemeProvider>
        <Provider store={this.props.store}>
          <div>
            <ReduxRouter routes={routes} />
            {devTools}
          </div>
        </Provider>
      </MuiThemeProvider>
    );
  }
}
