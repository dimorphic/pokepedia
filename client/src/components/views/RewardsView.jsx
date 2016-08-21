// deps
import React, { Component, PropTypes } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

// components
import RewardsPage from 'components/pages/RewardsPage';

// actions
import * as PokedexActions from 'actions/pokedex';

// map store
const mapStoreToProps = (store) => ({
  pokedex: store.pokedex
});

// map actions
const mapDispatchToProps = (dispatch) => ({
  actions: bindActionCreators(
    PokedexActions
  , dispatch)
});

@connect(mapStoreToProps, mapDispatchToProps)
class RewardsView extends Component {
  static propTypes = {
    actions: PropTypes.object.isRequired,
    pokedex: PropTypes.any.isRequired
  }

  componentDidMount() {
    const { items } = this.props.pokedex;

    if (!items.length) {
      this.fetchData();
    }
  }

  fetchData() {
    console.log('>> GO FETCH DATA');

    const { actions } = this.props;

    // fetch rewards list
    actions.getItems();
  }

  render() {
    const { pokedex } = this.props;

    return (
      <RewardsPage pokedex={pokedex} />
    );
  }
}

export default RewardsView;
