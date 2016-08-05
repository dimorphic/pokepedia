// deps
import React, { Component, PropTypes } from 'react';

// components
import Avatar from 'material-ui/Avatar';
import Chip from 'material-ui/Chip';
import RaisedButton from 'material-ui/RaisedButton';
import { Grid, GridCell } from 'components/atoms/Grid';

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

  getHeaderStyle(types = []) {
    const pokemonColors = this.getPokemonTypeColors(types);

    let headerBackground = pokemonColors[0];

    // generate gradient if more colors
    if (pokemonColors.length > 1) {
      const [toColor, fromColor] = pokemonColors;
      headerBackground = `-webkit-linear-gradient(top, ${toColor} 0%, ${fromColor} 100%)`;
    }

    return {
      background: headerBackground
    };
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

  render() {
    const { pokemon } = this.props;
    const { pokemonId } = pokemon;

    const headerStyle = this.getHeaderStyle(pokemon.type);
    const pokemonTypeChips = this.renderTypeChips(pokemon.type);
    const pokemonWeaknessesChips = this.renderTypeChips(pokemon.weaknesses);
    const pokemonImage = `http://www.serebii.net/pokemongo/pokemon/${pokemonId}.png`;

    const pokemonCandies = this.getPokemonCandies(pokemon.candy);

    return (
      <div className="PokeCard">
        <div className="PokeCard-Wrapper">
          <header className="PokeCard-Header" style={headerStyle}>
            <img className="PokeCard-Avatar" src={pokemonImage} alt={pokemon.name} />
          </header>

          <article className="PokeCard-Content">
            <div className="PokeCard-Identity">
              <h1 className="PokeCard-Name">{pokemon.name}</h1>
              {/* <h2 className="PokeCard-Type">#003</h2> */}

              <div className="PokeCard-Chips">
                <div className="PokeCard-Property-Name">Type</div>
                {pokemonTypeChips}
              </div>
            </div>

            <div className="PokeCard-Sepa"></div>

            <div className="PokeCard-Properties">
              <Grid
                flow="row"
                withGutter
              >
                <GridCell col={4}>
                  <div className="PokeCard-Property-Name">Weight</div>
                  <div className="PokeCard-Property-Value">{pokemon.weight}</div>
                </GridCell>

                <GridCell col={4}>
                  <div className="PokeCard-Property-Name">Height</div>
                  <div className="PokeCard-Property-Value">{pokemon.height}</div>
                </GridCell>

                <GridCell col={4}>
                  <div className="PokeCard-Property-Name">Candies</div>
                  <div className="PokeCard-Property-Value">{pokemonCandies}</div>
                </GridCell>
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
