// deps
import React, { Component, PropTypes } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

// actions
// import * as LocationActions from 'actions/location';

// map store
const mapStoreToProps = (store) => ({
  location: store.location
});

// map actions
// const mapDispatchToProps = (dispatch) => ({
//   actions: bindActionCreators(LocationActions, dispatch)
// });

@connect(mapStoreToProps, null)
class LocationContainer extends Component {
  static propTypes = {
    actions: PropTypes.object,
    location: PropTypes.object
  }

  // constructor(props) {
  //   super(props);
  // }

  componentDidMount() {
    this.fetchData();
  }

  fetchData() {
    console.log('>>> LOCATION FETCH DATA');

    const { actions } = this.props;

    // action test
  }

  render() {
    const { location } = this.props;

    return (
      <div>
        {JSON.stringify(location)}
      </div>
    );
  }
}

export default LocationContainer;
