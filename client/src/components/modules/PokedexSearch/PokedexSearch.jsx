// deps
import React, { Component, PropTypes } from 'react';
import shallowCompare from 'react-addons-shallow-compare';

// helpers
import { isValidItem } from 'utils/filterList';

// components
import AutoComplete from 'material-ui/AutoComplete';
import MenuItem from 'material-ui/MenuItem';
import PokemonIcon from 'components/atoms/PokemonIcon';

// style
import './PokedexSearch.scss';

export default class PokedexSearch extends Component {
  static propTypes = {
    pokemons: PropTypes.array
  };

  static defaultProps = {
    pokemons: []
  };

  constructor(props) {
    super(props);

    const searchOptions = this.buildSearchOptions(props);

    console.log('>> PokedexSearch @@ ', searchOptions);

    this.state = {
      searchOptions
    };

    this.onSearchFilter = this.onSearchFilter.bind(this);
    this.onSearchUpdate = this.onSearchUpdate.bind(this);
  }

  shouldComponentUpdate(nextProps, nextState) {
    return shallowCompare(this, nextProps, nextState);
  }

  onSearchSelect(chosenItem, index) {
    console.log('<<< search select ', chosenItem, index);
  }

  onSearchUpdate(searchTerm) {
    console.log('>>> search term : ', searchTerm);
  }

  onSearchFilter(searchText, key, item) {
    if (!searchText) { return null; }
    return isValidItem(searchText, item);
  }

  buildSearchOptions(props) {
    console.log('>> BUILD SEARCH OPTIONS ');

    const { pokemons } = props;

    // map Pokemons list
    const searchItems = pokemons.map(pokemon => {
      return {
        id: pokemon.id,
        text: pokemon.name,
        value: this.renderSearchItem(pokemon), // must be <MenuItem>

        // extra lookup search terms
        extra: {
          id: pokemon.pokemonId,
          type: pokemon.type
        }
      };
    });

    return searchItems;
  }

  renderSearchItem(pokemon) {
    return (
      <MenuItem
        rightIcon={<PokemonIcon pokemon={pokemon} />}
      >
        <span style={{ color: '#ccc' }}>{pokemon.pokemonId}</span> {pokemon.name}
      </MenuItem>
    );
  }

  renderSearch() {
    const { searchOptions } = this.state;

    return (
      <div className="PokedexSearch-Input">
        <AutoComplete
          fullWidth
          floatingLabelText="Search Pokedex"
          hintText="Try a Pokemon name, type or id (eg: electric)"

          dataSource={searchOptions}
          filter={this.onSearchFilter}

          onUpdateInput={this.onSearchUpdate}
          onNewRequest={this.onSearchSelect}
        />
      </div>
    );
  }

  render() {
    const node = this.renderSearch();

    return (
      <div className="PokedexSearch">
        {node}
      </div>
    );
  }
}
