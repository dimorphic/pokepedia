// deps
import React, { Component, PropTypes } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

// components
import RewardsPage from 'shared/components/pages/RewardsPage';

// actions
import * as PokedexActions from 'shared/actions/pokedex';

// map store
const mapStoreToProps = (store) => ({
  items: store.pokedex.items,
  levels: store.pokedex.levels,
  pokemons: store.pokedex.pokemons
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
    params: PropTypes.object,
    actions: PropTypes.object.isRequired,

    items: PropTypes.array,
    levels: PropTypes.array,
    pokemons: PropTypes.array
  }

  static needs = [
    PokedexActions.getItems,
    PokedexActions.getLevels,
    PokedexActions.getPokemons
  ];

  componentDidMount() {
    console.log('## MOUNT : REWARDS VIEW');
    // this.fetchData();
  }

  fetchData() {
    console.log('## FETCH DATA: REWARDS VIEW');

    const { actions, items, levels, pokemons } = this.props;

    const hasItems = (items && items.length);
    const hasLevels = (levels && levels.length);
    const hasPokemons = (pokemons && pokemons.length);

    // fetch data if needed
    if (!hasItems) { actions.getItems(); }
    if (!hasLevels) { actions.getLevels(); }
    if (!hasPokemons) { actions.getPokemons(); }
  }

  render() {
    const { params, items, levels, pokemons } = this.props;

    return (
      <RewardsPage
        params={params}

        items={items}
        levels={levels}
        pokemons={pokemons}
      />
    );
  }
}

export default RewardsView;
