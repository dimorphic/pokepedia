// deps
import React, { Component, PropTypes } from 'react';
import { isObject, isFinite } from 'lodash';

// helpers
// import { isValidItem } from 'utils/filterList';

// components
import PokepediaLoader from 'shared/components/atoms/PokepediaLoader';
import PokedexSearch from 'shared/components/modules/PokedexSearch';
import PokedexList from 'shared/components/modules/PokedexList';

// style
if (process.env.BROWSER) require('./PokedexPage.scss');

export default class PokedexPage extends Component {
  static propTypes = {
    pokedex: PropTypes.object.isRequired
  };

  constructor(props) {
    super(props);

    this.state = {
      searchResults: []
    };

    this.onSearchSelect = this.onSearchSelect.bind(this);
    this.onSearchUpdate = this.onSearchUpdate.bind(this);
    this.renderPokedex = this.renderPokedex.bind(this);
  }

  componentWillReceiveProps(nextProps) {
    const prevPokemons = this.props.pokedex.pokemons;
    const nextPokemons = nextProps.pokedex.pokemons;

    // rebuild pokemons search list
    if (
      !this.state.searchResults.length ||
      nextPokemons && (nextPokemons.length !== prevPokemons.length)
    ) {
      this.setState({
        searchResults: nextPokemons
      });
    }
  }

  onSearchUpdate(searchTerm) {
    const { pokemons } = this.props.pokedex;

    // clear / reset to full list
    if (searchTerm === '') {
      this.setState({
        searchResults: pokemons
      });
    }
  }

  // @TODO: move this to redux?
  onSearchSelect(keyword) {
    const { pokemons } = this.props.pokedex;

    let newList = [];

    if (isObject(keyword)) {
      // console.log('?? SIMPLE');

      // simple id search
      newList = pokemons.filter((pokemon) => {
        return pokemon.id === keyword.id;
      });
    } else {
      // string
      const isPokemonId = isFinite(parseInt(keyword, 10));

      if (isPokemonId) {
        // simple id search
        newList = pokemons.filter((pokemon) => {
          return (pokemon.pokemonId.indexOf(keyword) !== -1);
        });
      } else {
        // complex search ?
        newList = pokemons.filter((pokemon) => {
          const name = pokemon.name;

          let isValid = null;

          if (keyword.length === 1) {
            // check first letter
            isValid = (name.slice(0, 1).toLowerCase() === keyword.toLowerCase());
          } else if (keyword.length > 1) {
            // check full name
            isValid = (pokemon.name.toLowerCase().indexOf(keyword.toLowerCase()) !== -1);
          }

          return isValid;
        });
      }
      // @TODO: add search by Pokemon type
    }

    // console.log('pokedex select @ ', keyword);
    // console.log('pokedex select filter @ ', newList);
    // console.log(' ');

    this.setState({
      searchResults: newList
    });
  }

  renderPokedex() {
    const { pokemons } = this.props.pokedex;
    const { searchResults } = this.state;

    const node = (searchResults && searchResults.length) ?
      (<PokedexList pokemons={searchResults} />) : null;

    return (
      <div>
        <PokedexSearch
          pokemons={pokemons}
          onSearch={this.onSearchUpdate}
          onSelect={this.onSearchSelect}
        />
        {node}
      </div>
    );
  }

  render() {
    const { pokemons } = this.props.pokedex;
    const hasPokemons = (pokemons && pokemons.length);

    // const node = !hasPokemons ? (<PokepediaLoader />) : this.renderPokedex();
    const node = !hasPokemons ? (<PokepediaLoader />) : `list size : ${pokemons.length}`;

    return (
      <div className="Page PokedexPage">
        {node}
      </div>
    );
  }
}
