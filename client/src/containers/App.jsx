// deps
import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

// components
import Test from 'components/test';

export default class App extends Component {
  static propTypes = {
    children: PropTypes.node
  };

  render() {
    return (
      <div>
        <Test />
        {this.props.children}
      </div>
    );
  }
}
