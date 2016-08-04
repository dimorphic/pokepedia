// deps
import React, { Component, PropTypes } from 'react';

export default class App extends Component {
  static propTypes = {
    children: PropTypes.node
  };

  render() {
    return (
      <div className="App">
        {this.props.children}
      </div>
    );
  }
}
