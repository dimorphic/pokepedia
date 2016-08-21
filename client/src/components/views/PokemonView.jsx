// deps
import React, { Component, PropTypes } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

// components
import PokemonPage from 'components/pages/PokemonPage';

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
class PokemonView extends Component {
  static propTypes = {
    actions: PropTypes.object.isRequired,
    params: PropTypes.object,
    pokedex: PropTypes.any.isRequired
  }

  componentDidMount() {
    const { pokemons } = this.props.pokedex;

    if (!pokemons.length) {
      this.fetchData();
    }
  }

  getPokemon(id) {
    const { pokemons } = this.props.pokedex;

    if (!pokemons || !id) { return null; }

    // search pokemon by id or name
    return pokemons.find((pokemon) => {
      const checkId = (pokemon.id === parseInt(id, 10));
      const checkName = (pokemon.name.toLowerCase() === id.toLowerCase());

      return (checkId || checkName);
    });
  }

  fetchData() {
    const { actions } = this.props;

    // fetch pokemons list
    actions.getPokemons();
  }

  render() {
    const { pokemonId } = this.props.params;
    const pokemon = this.getPokemon(pokemonId);

    return (
      <PokemonPage pokemon={pokemon} />
    );
  }
}

export default PokemonView;
