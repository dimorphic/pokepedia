// deps
import React, { Component, PropTypes } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

// components
import PokemonPage from 'shared/components/pages/PokemonPage';

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
class PokemonView extends Component {
  static propTypes = {
    actions: PropTypes.object.isRequired,
    params: PropTypes.object,
    pokedex: PropTypes.any.isRequired
  }

  static needs = [
    PokedexActions.getPokemons
  ];

  componentDidMount() {
    console.log('## MOUNT : POKEMON VIEW');
    this.fetchData();
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
    const { actions, pokedex } = this.props;
    const { pokemons } = pokedex;

    const hasPokemons = (pokemons && pokemons.length);

    // fetch pokemons list
    if (!hasPokemons) {
      console.log('## FETCH DATA : POKEMON VIEW');
      actions.getPokemons();
    }
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
