// deps
import React, { Component } from 'react';

import Test from './components/test';

export default class Root extends Component {
  render() {
    return (
      <div>
        <h1>Hello, world.</h1>
        <Test />
      </div>
    );
  }
}
