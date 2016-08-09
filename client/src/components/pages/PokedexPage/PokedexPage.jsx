// deps
import React, { Component, PropTypes } from 'react';
import { isObject, isFinite } from 'lodash';

// helpers
// import { isValidItem } from 'utils/filterList';

// components
import Drawer from 'material-ui/Drawer';
import CircularProgress from 'material-ui/CircularProgress';
import RaisedButton from 'material-ui/RaisedButton';
import IconButton from 'material-ui/IconButton';
import FontIcon from 'material-ui/FontIcon';
import IconInfo from 'material-ui/svg-icons/action/info-outline';

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

    this.state = {
      drawerOpened: false,
      searchResults: []
    };

    this.onSearchSelect = this.onSearchSelect.bind(this);
    this.onSearchUpdate = this.onSearchUpdate.bind(this);
    this.renderPokedex = this.renderPokedex.bind(this);
    this.toggleDrawer = this.toggleDrawer.bind(this);
  }

  componentWillReceiveProps(nextProps) {
    const prevPokemons = this.props.pokedex.pokemons;
    const nextPokemons = nextProps.pokedex.pokemons;

    // rebuild pokemons search list
    if (nextPokemons && (nextPokemons.length !== prevPokemons.length)) {
      this.setState({
        searchResults: nextPokemons
      });
    }
  }

  onSearchUpdate(searchTerm) {
    console.log('<<< search term : ', searchTerm);
    // const { searchResults } = this.state;
    const { pokemons } = this.props.pokedex;

    // reset to full list
    if (searchTerm === '') {
      // if (searchResults.length !)

      console.log('<< CLEAR LIST !');

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

  toggleDrawer() {
    this.setState({
      drawerOpened: !this.state.drawerOpened
    });
  }

  renderLoader() {
    return (
      <div className="PokedexPage-Loader">
        <CircularProgress color={'#9416ff'} />
        <div className="PokedexPage-Tip">
          Tip: Pay attention to the road... :)
        </div>
      </div>
    );
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

  // @TODO: make this a component?
  renderInfoButton() {
    return (
      <div className="Pokepedia-InfoButton">
        <IconButton
          tooltip="About"
          tooltipPosition="bottom-center"
          onTouchTap={this.toggleDrawer}
        >
          <IconInfo className="Pokepedia-InfoButton-Icon" />
        </IconButton>
      </div>
    );
  }

  // @TODO: make this a component?
  renderDrawer() {
    return (
      <Drawer
        open={this.state.drawerOpened}
        onRequestChange={this.toggleDrawer}
        docked={false}
      >
        <div className="Pokepedia-Info">
          <div className="Pokepedia-About">
            {/* <PokeLoader /> */}
            <img className="img-fluid" src={'assets/pokepedia-logo-ball.png'} alt="Pokepedia" />
            <h2>pokepedia.fyi</h2>
            <h4>Your only Pokémon GO stop!</h4>
          </div>
          <div className="Pokepedia-Info-Content">
            <p>
              Discover all Pokémons stats, weaknesses, evolution chances, trainer
              level rewards and more!
            </p>

            {/* COMING SOON */}
            <div className="Pokepedia-Sepa"></div>
            <p className="Pokepedia-Soon">Coming soon:</p>
            <ul>
              <li>Egg & level rewards charts</li>
              <li>Evolution calculator</li>
              <li>Battle simulator</li>
              <li>Map of Pokemons locations</li>
            </ul>
            <p>... and moar!</p>
            <div className="Pokepedia-Sepa"></div>

            {/* SOCIAL */}
            <div className="Pokepedia-Social">
              <p>Stay tuned!</p>

              <RaisedButton
                label="PokepediaFYI"
                href="https://www.facebook.com/PokepediaFYI/"
                icon={<FontIcon className="fa fa-facebook" />}
                backgroundColor="#3b5998"
                labelColor="#fff"
              />
              <span className="Pokepedia-SocialOr">or</span>
              <RaisedButton
                label="@PokepediaFYI"
                href="https://twitter.com/PokepediaFYI"
                icon={<FontIcon className="fa fa-twitter" />}
                backgroundColor="#1da1f2"
                labelColor="#fff"
              />
            </div>
            <div className="Pokepedia-Sepa"></div>
            <div className="Coded">
              <i className="fa fa-code" />
              for the
              <i className="fa fa-heart" />
              of games
            </div>
          </div>

          <div className="Pokepedia-Footer">
            All trademarks, product names and logos appearing on the site are
            the property of their respective owners.
          </div>
        </div>
      </Drawer>
    );
  }

  render() {
    const { pokemons } = this.props.pokedex;
    const hasPokemons = (pokemons && pokemons.length);

    const infoButton = this.renderInfoButton();
    const drawer = this.renderDrawer();
    const node = !hasPokemons ? this.renderLoader() : this.renderPokedex();

    return (
      <div className="Page PokedexPage">
        <div className="Pokepedia-Header">
          <PokeLoader />
          <div className="Pokepedia-Logo">
            <h1 className="Pokepedia-Name">PokéPedia</h1>
            <span className="Pokepedia-Version">Beta</span>
          </div>

          {infoButton}
        </div>
        {drawer}
        {node}
      </div>
    );
  }
}
