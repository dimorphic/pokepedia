// deps
import React, { Component, PropTypes } from 'react';

// components
import PokeList from 'components/modules/PokeList';

// style
import './PokedexPage.scss';

export default class PokedexPage extends Component {
  static propTypes = {
    pokemons: PropTypes.array.isRequired
  };

  render() {
    const { pokemons } = this.props;

    return (
      <div className="PokedexPage">
        <PokeList pokemons={pokemons} />
      </div>
    );
  }
}
