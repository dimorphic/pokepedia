// deps
import React, { Component, PropTypes } from 'react';

// components
import PokepediaLoader from 'components/atoms/PokepediaLoader';
import PokeCard from 'components/atoms/PokeCard';

// style
// import './PokemonPage.scss';

export default class PokemonPage extends Component {
  static propTypes = {
    pokemon: PropTypes.object
  };

  render() {
    const { pokemon } = this.props;

    const node = pokemon ? (<PokeCard pokemon={pokemon} />) : (<PokepediaLoader />);

    return (
      <div className="Page PokemonPage">
        {node}
      </div>
    );
  }
}
