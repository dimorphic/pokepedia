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
          <Avatar size={32} backgroundColor={colors.avatarColor}>
            ?
          </Avatar>
          {type}
        </Chip>
      );
    });

    return chips;
  }

  render() {
    const { pokemon } = this.props;

    // if (!pokemon) { return null; }
    // const { name, pokemonId, type } = pokemon;

    const pokemonTypeChips = this.renderTypeChips(pokemon.type);

    // const pokemonImage = `http://www.serebii.net/pokemongo/pokemon/${pokemonId}.png`;

    return (
      <div className="PokeCard">
        <div className="PokeCard-Wrapper">
          <header className="PokeCard-Header">
            <img className="PokeCard-Avatar" src={'http://placehold.it/400x20&text=slide1'} alt="foo" />
          </header>

          <article className="PokeCard-Content">
            <div className="PokeCard-Identity">
              <h1 className="PokeCard-Name">Pikachiu</h1>
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
                  <div className="PokeCard-Property-Value">9.68 kg</div>
                </GridCell>

                <GridCell col={4}>
                  <div className="PokeCard-Property-Name">Height</div>
                  <div className="PokeCard-Property-Value">0.84 m</div>
                </GridCell>

                <GridCell col={4}>
                  <div className="PokeCard-Property-Name">Candies</div>
                  <div className="PokeCard-Property-Value">3 (C)</div>
                </GridCell>
              </Grid>
            </div>

            {/* <RaisedButton label="Default" /> */}

            <div className="PokeCard-Chips">
              <div className="PokeCard-Property-Name">Weaknesses</div>
              {pokemonTypeChips}
            </div>
          </article>
        </div>
      </div>
    );
  }
}
