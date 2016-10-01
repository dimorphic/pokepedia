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

// helpers
import POKEMON_COLORS from 'shared/constants/pokemon-type-colors';
import * as pokeutils from 'shared/utils/poke';

// styles
if (process.env.BROWSER) require('./PokeCard.scss');

// helpers
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

export default class PokeCard extends Component {
  static propTypes = {
    pokemon: PropTypes.object.isRequired
  };

  renderTypeChips(types) {
    const chips = types.map((type) => {
      const colors = POKEMON_COLORS[type] || {};

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

  renderDetailIcon(detailName) {
    const Icon = POKEMON_STATS_SCALE[detailName.toLowerCase()].icon;

    if (!Icon) { return null; }

    return (
      <Icon className="PokeCard-Property-Icon" />
    );
  }

  renderPokeDetail(label, value) {
    const pokemonStat = POKEMON_STATS_SCALE[label.toLowerCase()];

    // format poke stats detail
    let propScale = null;
    // let propIcon = null;

    if (pokemonStat) {
      propScale = (<span>{pokemonStat.scale}</span>);
      // propIcon = this.renderDetailIcon(label);
    }

    const pokeStatsValue = propScale ? (
      <div className="PokeCard-Property-Value">
        {value}
        {propScale}
      </div>
    ) : value;

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

    const pokemonStyle = pokeutils.getPokemonStyles(pokemon.type);
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
