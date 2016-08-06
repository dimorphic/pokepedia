// deps
import React, { Component, PropTypes } from 'react';

// components
import { Grid, GridCell } from 'components/atoms/Grid';
import PokeCard from 'components/atoms/PokeCard';

// style
import './PokeList.scss';

export default class PokeList extends Component {
  static propTypes = {
    pokemons: PropTypes.array.isRequired
  };

  static defaultProps = {
    pokemons: []
  };

  renderPokeCards() {
    const { pokemons } = this.props;

    const testList = [
      pokemons[0],
      pokemons[1],
      pokemons[2],
      pokemons[3],
      pokemons[4],
      pokemons[5],
      pokemons[6],
      pokemons[7]
    ];

    const pokeCards = pokemons.map((pokemon) => {
      return (
        <GridCell key={pokemon.pokemonId} fit className="PokeCard-Cell">
          <PokeCard key={pokemon.pokemonId} pokemon={pokemon} />
        </GridCell>
      );
    });

    return pokeCards;
  }

  render() {
    const { pokemons } = this.props;

    const pokeCards = pokemons.length ? this.renderPokeCards() : 'No pokemons bro';

    return (
      <div className="PokeList">
        <Grid
          flow="row"
          withGutter
          equalHeight
        >
          {pokeCards}
        </Grid>
      </div>
    );
  }
}
