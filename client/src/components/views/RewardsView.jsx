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
  items: store.pokedex.items,
  levels: store.pokedex.levels
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
    items: PropTypes.array,
    levels: PropTypes.array
  }

  componentDidMount() {
    this.fetchData();
  }

  fetchData() {
    // console.log('>> GO FETCH DATA');

    const { actions, items, levels } = this.props;

    const hasItems = (items && items.length);
    const hasLevels = (levels && levels.length);

    // fetch data if needed
    if (!hasItems) { actions.getItems(); }
    if (!hasLevels) { actions.getLevels(); }
  }

  render() {
    const { items, levels } = this.props;

    return (
      <RewardsPage items={items} levels={levels} />
    );
  }
}

export default RewardsView;
