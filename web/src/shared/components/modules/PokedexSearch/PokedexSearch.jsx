// deps
import React, { Component, PropTypes } from 'react';
import shallowCompare from 'react-addons-shallow-compare';

// helpers
import { isValidItem } from 'shared/utils/filterList';

// components
import AutoComplete from 'material-ui/AutoComplete';
import MenuItem from 'material-ui/MenuItem';
import PokemonIcon from 'shared/components/atoms/PokemonIcon';

// style
if (process.env.BROWSER) require('./PokedexSearch.scss');

export default class PokedexSearch extends Component {
  static propTypes = {
    pokemons: PropTypes.array,

    onSearch: PropTypes.func,
    onSelect: PropTypes.func
  };

  static defaultProps = {
    pokemons: []
  };

  constructor(props) {
    super(props);

    // build search options
    const searchOptions = this.buildSearchOptions(props);

    this.state = {
      searchOptions
    };

    this.onSearchFilter = this.onSearchFilter.bind(this);
    this.onSearchUpdate = this.onSearchUpdate.bind(this);
    this.onSearchSelect = this.onSearchSelect.bind(this);
  }

  shouldComponentUpdate(nextProps, nextState) {
    return shallowCompare(this, nextProps, nextState);
  }

  onSearchSelect(chosenItem) {
    if (this.props.onSelect) {
      this.props.onSelect(chosenItem);
    }
  }

  onSearchUpdate(searchTerm) {
    if (this.props.onSearch) {
      this.props.onSearch(searchTerm);
    }
  }

  onSearchFilter(searchText, key, item) {
    if (!searchText) { return null; }
    return isValidItem(searchText, item);
  }

  buildSearchOptions(props) {
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
        <span className="PokedexSearch-Item">#{pokemon.pokemonId}</span> {pokemon.name}
      </MenuItem>
    );
  }

  renderSearch() {
    const { searchOptions } = this.state;

    return (
      <div className="PokedexSearch-Input">
        <AutoComplete
          id="PokeSearchInput"
          fullWidth
          floatingLabelText="Search Pokédex"
          hintText="Pokemon name, type or id (eg: electric)"

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
