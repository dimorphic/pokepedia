// deps
import React, { Component, PropTypes } from 'react';
import shallowCompare from 'react-addons-shallow-compare';

// helpers
import { isValidItem } from 'utils/filterList';

// components
import CircularProgress from 'material-ui/CircularProgress';

import AutoComplete from 'material-ui/AutoComplete';
import MenuItem from 'material-ui/MenuItem';

import PokemonIcon from 'components/atoms/PokemonIcon';
import PokeLoader from 'components/atoms/PokeLoader';
import PokedexSearch from 'components/modules/PokedexSearch';
import PokedexList from 'components/modules/PokedexList';

// style
import './PokedexPage.scss';

export default class PokedexPage extends Component {
  static propTypes = {
    pokedex: PropTypes.object.isRequired
  };

  constructor(props) {
    super(props);

    this.renderPokedex = this.renderPokedex.bind(this);
  }

  renderLoader() {
    return (
      <div className="PokedexPage-Loader">
        <CircularProgress size={2} />
        <br />
        Loading...
      </div>
    );
  }

  renderPokedex() {
    const { pokemons } = this.props.pokedex;

    return (
      <div>
        <PokedexSearch pokemons={pokemons} />
        <PokedexList pokemons={pokemons} />
      </div>
    );
  }

  render() {
    const { pokemons } = this.props.pokedex;
    const hasPokemons = (pokemons && pokemons.length);

    const node = !hasPokemons ? this.renderLoader() : this.renderPokedex();
    // const node = this.renderLoader();

    return (
      <div className="PokedexPage">
        <div className="Pokepedia-Logo">
          <PokeLoader />
          <h1 className="Pokepedia-Greet">PokéPedia</h1>
        </div>
        {node}
      </div>
    );
  }
}
