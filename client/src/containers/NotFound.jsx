// deps
import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import { push } from 'redux-router';

@connect(null, { push })
class NotFound extends Component {
  static propTypes = {
    actions: PropTypes.object
  }

  goToHome() {
    const { actions } = this.props;
    actions.push('/');
  }

  render() {
    return (
      <div className="Page NotFound">
        <h3 className="NotFound-Message">
          Nothing here :(
        </h3>
      </div>
    );
  }
}

export default NotFound;
