// deps
import React, { Component } from 'react';
import { ReduxRouter } from 'redux-router';

// components
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
// import DevTools from './DevTools';

// routes
import routes from 'shared/routes';

// devtools for easy debugging
// const devtoolsActive = false; // (localStorage.getItem('devtools') === 'true');

export default class Root extends Component {
  static propTypes = {
    history: React.PropTypes.any.isRequired
  };

  render() {
    const { history } = this.props;
    // const devTools = devtoolsActive ? <DevTools /> : null;

    return (
      <MuiThemeProvider>
        <ReduxRouter routes={routes} history={history} />
      </MuiThemeProvider>
    );
  }
}
