// deps
import React, { Component, PropTypes } from 'react';
import Helmet from 'react-helmet';

export default class App extends Component {
  static propTypes = {
    children: PropTypes.any
  };

  render() {
    return (
      <div>
        <Helmet
          title="App"
          titleTemplate="%s - SSR"
          meta={[
            { 'char-set': 'utf-8' },
            {
              'name': 'description',
              'content': 'My super dooper SSR app!'
            }
          ]}
          onChangeClientState={(newState) => console.log(newState)}
        />
        <div>hello from App container!?</div>
        {this.props.children}
      </div>
    );
  }
}
