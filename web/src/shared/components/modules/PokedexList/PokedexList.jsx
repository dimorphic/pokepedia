// deps
import React, { Component, PropTypes } from 'react';
import cx from 'classnames';

// components
import Popover from 'material-ui/Popover';
import { Grid, GridCell } from 'components/atoms/Grid';
import PokedexItem from './PokedexItem';
import PokeCard from 'components/atoms/PokeCard';

// style
if (process.env.BROWSER) require('./PokedexList.scss');

export default class PokedexList extends Component {
  static propTypes = {
    pokemons: PropTypes.array.isRequired
  };

  static defaultProps = {
    pokemons: []
  };

  constructor(props) {
    super(props);

    this.state = {
      pokedexAnchor: null,
      pokedexOpened: false,
      pokedexPokemon: null
    };

    this.renderPokedex = this.renderPokedex.bind(this);
    this.renderPokedexPopover = this.renderPokedexPopover.bind(this);
    this.openDex = this.openDex.bind(this);
    this.closeDex = this.closeDex.bind(this);
  }

  openDex(pokemonId, event) {
    // console.log('!!! OPEN pokedex @ ', pokemonId, event.currentTarget);
    const { pokemons } = this.props;

    // find pokemon in Pokedex
    const pokemonData = pokemons.filter((pokemon) => { return pokemon.id === pokemonId; })[0];

    // prevent ghost click
    event.preventDefault();

    this.setState({
      pokedexAnchor: event.currentTarget,
      pokedexPokemon: pokemonData,
      pokedexOpened: true
    });
  }

  closeDex() {
    // console.log('!!! CLOSE pokedex');
    this.setState({
      pokedexOpened: false,
      pokedexPokemon: null
    });
  }

  renderPokedexPopover() {
    const { pokedexOpened, pokedexAnchor, pokedexPokemon } = this.state;

    const pokeCard = pokedexPokemon ? (<PokeCard pokemon={pokedexPokemon} />) : null;
    const pokeType = pokedexPokemon ? pokedexPokemon.type[0] : null;

    // pokeball appereance ?! :D
    const pokeball = false;

    const cssClasses = cx('PokedexList-Popover', {
      'PokedexList-Popover--Pokeball': pokeball,
      [`PokedexList-Popover--Pokeball--${pokeType}`]: pokeball
    });

    return (
      <Popover
        className={cssClasses}
        open={pokedexOpened}
        onRequestClose={::this.closeDex}

        anchorEl={pokedexAnchor}
        anchorOrigin={{ horizontal: 'middle', vertical: 'bottom' }}
        targetOrigin={{ horizontal: 'middle', vertical: 'center' }}
      >
        {pokeCard}
      </Popover>
    );
  }

  renderPokedex() {
    const { pokemons } = this.props;

    const pokeCards = pokemons.map((pokemon) => {
      return (
        <GridCell
          key={pokemon.pokemonId}
          fit
          className="PokedexItem-Cell"
        >
          <PokedexItem
            pokemon={pokemon}
            onClick={this.openDex.bind(this, pokemon.id)}
          />
        </GridCell>
      );
    });

    return pokeCards;
  }

  // renderPokeCards() {
  //   const { pokemons } = this.props;
  //
  //   const pokeCards = pokemons.map((pokemon) => {
  //     return (
  //       <GridCell key={pokemon.pokemonId} fit className="PokeCard-Cell">
  //         <PokeCard key={pokemon.id} pokemon={pokemon} />
  //       </GridCell>
  //     );
  //   });
  //
  //   return (
  //     <Grid
  //       flow="row"
  //       align="center"
  //       withGutter
  //       equalHeight
  //     >
  //       {pokeCards}
  //     </Grid>
  //   );
  // }

  render() {
    const { pokemons } = this.props;
    const hasPokemons = (pokemons && pokemons.length);

    if (!hasPokemons) return 'No pokemons to list';

    // const pokeCards = hasPokemons ? this.renderPokeCards() : null;
    const pokeDex = hasPokemons ? this.renderPokedex() : 'No pokemons bro';
    const pokedexPopover = hasPokemons ? this.renderPokedexPopover() : null;

    return (
      <div className="PokedexList">
        <Grid
          flow="row"
          align="center"
          withGutter
          equalHeight
        >
          {pokeDex}
          {pokedexPopover}
        </Grid>
      </div>
    );
  }
}
