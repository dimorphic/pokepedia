// deps
import React, { Component, PropTypes } from 'react';
// import { Link } from 'react-router';

// components
import Avatar from 'material-ui/Avatar';
import Chip from 'material-ui/Chip';
import IconHeight from 'material-ui/svg-icons/editor/vertical-align-top';
import IconWeight from 'material-ui/svg-icons/editor/vertical-align-bottom';

import { Grid, GridCell } from 'shared/components/atoms/Grid';
import PokemonIcon from 'shared/components/atoms/PokemonIcon';

if (process.env.BROWSER) require('./PokeCard.scss');

// helpers
// const isNumber = /\d+/g;

// constants / models (prop types)
import POKEMON_TYPES from 'shared/constants/pokemon-types';

const POKEMON_STATS_SCALE = {
  height: {
    icon: IconHeight,
    scale: 'm'
  },

  weight: {
    icon: IconWeight,
    scale: 'kg'
  }
};

const css = {
  chip: {
    margin: 4
  }
};

// fast extract of pokemon types colors for use in SCSS
// @TODO: make this dynamic
// const cssColors = Object.keys(POKEMON_TYPES).map((type) => {
//   console.log(`${type}: ${POKEMON_TYPES[type].avatarColor}`);
// });
//
// console.log('css colors @ ', cssColors);

//
// @DEBUG: Pokemon sample
//
// {
//   "id": 1,
//   "pokemonId": "001",
//   "name": "Bulbasaur",
//   "capture_rate": 0.16,
//   "flee_rate": 0.1,
//   "candy_count": 25,
//   "candy_name": "Bulbasaur Candy",
//   "egg": 2,
//   "multipliers": [
//     1.58
//   ],
//   "stats": {
//     "attack": 126,
//     "defense": 126,
//     "stamina": 90,
//     "height": 0.71,
//     "weight": 6.9
//   },
//   "type": [
//     "Grass",
//     "Poison"
//   ],
//   "weaknesses": [
//     "Fire",
//     "Ice",
//     "Flying",
//     "Psychic"
//   ],
//   "next_evolution": [
//     {
//       "name": "Ivysaur",
//       "pokemonId": "002"
//     },
//     {
//       "name": "Venusaur",
//       "pokemonId": "003"
//     }
//   ]
// }

export default class PokeCard extends Component {
  static propTypes = {
    pokemon: PropTypes.object.isRequired
  };

  getPokemonTypeColors(types) {
    const pokemonColors = types.map((pokemonType) => {
      return POKEMON_TYPES[pokemonType].avatarColor;
    });

    return pokemonColors;
  }

  getPokemonStyle(types = []) {
    const pokemonColors = this.getPokemonTypeColors(types);

    const textColor = pokemonColors[0]; // first type color always
    let textShadow = null;
    let headerBackground = pokemonColors[0];

    // generate gradient if more colors
    if (pokemonColors.length > 1) {
      const [fromColor, toColor] = pokemonColors;
      headerBackground = `-webkit-linear-gradient(top, ${toColor} 0%, ${fromColor} 100%)`;
      textShadow = `1px 2px 0px ${toColor}`;
    }

    return {
      background: headerBackground,
      textColor,
      textShadow
    };
  }

  renderTypeChips(types) {
    const chips = types.map((type) => {
      const colors = POKEMON_TYPES[type] || {};

      return (
        <Chip
          key={type}
          style={css.chip}

          backgroundColor={colors.backgroundColor}
        >
          <Avatar size={32} color={colors.textColor} backgroundColor={colors.avatarColor}>
            {type.substr(0, 1)}
          </Avatar>
          {type}
        </Chip>
      );
    });

    return chips;
  }

  renderPokeDetail(label, detail) {
    const pokemonStat = POKEMON_STATS_SCALE[label.toLowerCase()];

    // format poke stats detail
    const propValue = detail;
    let propScale = null;
    // let propIcon = null;

    if (pokemonStat) {
      // const Icon = pokemonStat.icon;

      propScale = (<span>{pokemonStat.scale}</span>);
      // propIcon = (<Icon className="PokeCard-Property-Icon" />);
    }

    const pokeStatsValue = propScale ? (
      <div className="PokeCard-Property-Value">
        {propValue}
        {propScale}
      </div>
    ) : propValue;

    return (
      <GridCell key={label} col={4}>
        {/* propIcon */}
        <div className="PokeCard-Property-Name">{label}</div>
        <div className="PokeCard-Property-Value">
          {pokeStatsValue}
        </div>
      </GridCell>
    );
  }

  render() {
    const { pokemon } = this.props;

    const pokemonStyle = this.getPokemonStyle(pokemon.type);
    const pokemonTypeChips = this.renderTypeChips(pokemon.type);
    const pokemonWeaknessesChips = this.renderTypeChips(pokemon.weaknesses);

    const pokemonDetails = [
      this.renderPokeDetail('Weight', pokemon.stats.weight),
      this.renderPokeDetail('Height', pokemon.stats.height),
      this.renderPokeDetail('Candies', pokemon.candy_count)
    ];

    return (
      <div className="PokeCard">
        <div className="PokeCard-Wrapper">
          <header className="PokeCard-Header" style={{ background: pokemonStyle.background }}>
            <div className="PokeCard-Avatar">
              <PokemonIcon pokemon={pokemon} />
            </div>
          </header>

          <article className="PokeCard-Content">
            <div className="PokeCard-Identity">
              {/* <Link to={`/pokemon/${pokemon.id}`}> */}
              <h1
                className="PokeCard-Name"
                style={{
                  color: pokemonStyle.textColor,
                  textShadow: pokemonStyle.textShadow
                }}
              >
                {pokemon.name}
              </h1>
              {/* </Link> */}
              <span className="PokeCard-No">#{pokemon.id}</span>
            </div>
            <div className="PokeCard-Chips">
              <div className="PokeCard-Property-Name">Type</div>
              {pokemonTypeChips}
            </div>

            <div className="PokeCard-Sepa"></div>

            <div className="PokeCard-Properties">
              <Grid
                flow="row"
                withGutter
              >
                {pokemonDetails}
              </Grid>
            </div>

            <div className="PokeCard-Chips">
              <div className="PokeCard-Property-Name">Weaknesses</div>
              {pokemonWeaknessesChips}
            </div>
          </article>
        </div>
      </div>
    );
  }
}
