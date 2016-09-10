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

  componentDidMount() {
    this.fetchData();
  }

  fetchData() {
    console.log('>> GO FETCH DATA');

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
