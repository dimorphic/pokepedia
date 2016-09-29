// deps
import React, { Component, PropTypes } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

// components
import PokedexPage from 'shared/components/pages/PokedexPage';

// actions
import * as PokedexActions from 'shared/actions/pokedex';

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
class PokedexView extends Component {
  static propTypes = {
    actions: PropTypes.object.isRequired,
    pokedex: PropTypes.any.isRequired
  }

  static needs = [
    PokedexActions.getPokemons
  ];

  componentDidMount() {
    console.log('## MOUNT : POKEDEX VIEW');
    this.fetchData();
  }

  fetchData() {
    console.log('## FETCH DATA : POKEDEX VIEW');

    const { actions, pokedex } = this.props;
    const { pokemons } = pokedex;

    const hasPokemons = (pokemons && pokemons.length);

    // fetch pokemons list
    if (!hasPokemons) { actions.getPokemons(); }
  }

  render() {
    const { pokedex } = this.props;

    return (
      <PokedexPage pokedex={pokedex} />
    );
  }
}

export default PokedexView;
