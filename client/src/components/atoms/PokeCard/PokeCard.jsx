// deps
import React, { Component, PropTypes } from 'react';

// components
import Avatar from 'material-ui/Avatar';
import Chip from 'material-ui/Chip';
import RaisedButton from 'material-ui/RaisedButton';
import { Grid, GridCell } from 'components/atoms/Grid';
import PokemonIcon from 'components/atoms/PokemonIcon';

// constants / models (prop types)
import POKEMON_TYPES from 'constants/pokemon-types';
// import PokemonModel from 'constants/pokemon.model';

// style
import { blue50, blue300, blue500 } from 'material-ui/styles/colors';
import './PokeCard.scss';

// helpers
const isNumber = /\d+/g;

// [
//   {
//     "id": 1,
//     "name": "Bulbasaur",
//     "type": [
//       "Grass",
//       "Poison"
//     ],
//     "height": "0.71 m",
//     "weight": "6.9 kg",
//     "candy": "25 Bulbasaur Candy",
//     "egg": "2 km",
//     "multipliers": 1.58,
//     "weaknesses": [
//       "Fire",
//       "Ice",
//       "Flying",
//       "Psychic"
//     ],
//     "next_evolution": [
//       {
//         "name": "Ivysaur",
//         "pokemonId": "002"
//       },
//       {
//         "name": "Venusaur",
//         "pokemonId": "003"
//       }
//     ],
//     "pokemonId": "001"
//   }
// ]

const css = {
  chip: {
    margin: 4
  }
};

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

  getPokemonCandies(candies) {
    return candies.match(isNumber) || 'None';
  }

  getPokemonDetails(pokemon) {
    const { height, weight, candy, egg } = pokemon;
    const pokeDetails = { height, weight, candy, egg };

    // format poke details keys to [value, type] format
    // eg: {
    //  height: ['0.41', 'm'],
    //  weight: ['4.0', 'kg']
    // }
    return Object.keys(pokeDetails).reduce((acc, curr) => {
      acc[curr] = this.formatPokeDetail(pokeDetails[curr]);
      return acc;
    }, {});
  }

  getHeaderStyle(types = []) {
    const pokemonColors = this.getPokemonTypeColors(types);

    let headerBackground = pokemonColors[0];

    // generate gradient if more colors
    if (pokemonColors.length > 1) {
      const [fromColor, toColor] = pokemonColors;
      headerBackground = `-webkit-linear-gradient(top, ${toColor} 0%, ${fromColor} 100%)`;
    }

    return {
      background: headerBackground
    };
  }

  formatPokeDetail(detail) {
    if (detail.match(isNumber)) {
      return detail.split(' ');
    }

    return detail;
  }

  renderTypeChips(types) {
    const chips = types.map((type) => {
      // <Chip
      //    backgroundColor={blue300}
      //    onRequestDelete={handleRequestDelete}
      //    onTouchTap={handleTouchTap}
      //    style={styles.chip}
      //  >
      //    <Avatar size={32} color={blue300} backgroundColor={indigo900}>
      //      MB
      //    </Avatar>
      //    Colored Chip
      //  </Chip>

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
    let propValue;
    let propScale;

    // format poke detail (eg: { height: ['0.41', 'm'] } )
    const pokeDetail = this.formatPokeDetail(detail);

    if (Array.isArray(pokeDetail)) {
      [propValue, propScale] = pokeDetail;
    } else {
      propValue = pokeDetail;
    }

    const pokeDetailValue = propScale ? (
      <div className="PokeCard-Property-Value">
        {propValue}
        <span>{propScale}</span>
      </div>
    ) : propValue;

    return (
      <GridCell key={label} col={4}>
        <div className="PokeCard-Property-Name">{label}</div>
        <div className="PokeCard-Property-Value">
          {pokeDetailValue}
        </div>
      </GridCell>
    );
  }

  render() {
    const { pokemon } = this.props;
    const { pokemonId } = pokemon;

    const headerStyle = this.getHeaderStyle(pokemon.type);
    const pokemonTypeChips = this.renderTypeChips(pokemon.type);
    const pokemonWeaknessesChips = this.renderTypeChips(pokemon.weaknesses);

    const pokemonDetails = [
      this.renderPokeDetail('Weight', pokemon.weight),
      this.renderPokeDetail('Height', pokemon.height),
      this.renderPokeDetail('Candies', pokemon.candy)
    ];

    return (
      <div className="PokeCard">
        <div className="PokeCard-Wrapper">
          <header className="PokeCard-Header" style={headerStyle}>
            <div className="PokeCard-Avatar">
              <PokemonIcon pokemon={pokemon} />
            </div>
          </header>

          <article className="PokeCard-Content">
            <div className="PokeCard-Identity">
              <h1 className="PokeCard-Name">{pokemon.name}</h1>
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

            {/* <RaisedButton label="Default" /> */}

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
