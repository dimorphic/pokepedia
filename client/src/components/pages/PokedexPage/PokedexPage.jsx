// deps
import React, { Component, PropTypes } from 'react';

// components
import PokedexList from 'components/modules/PokedexList';

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
        <PokedexList pokemons={pokemons} />
      </div>
    );
  }
}
