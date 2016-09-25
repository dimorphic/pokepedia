// deps
import React, { Component, PropTypes } from 'react';
import cx from 'classnames';
import LazyLoad from 'react-lazyload';

// components
import { Grid, GridCell } from 'shared/components/atoms/Grid';
import PokemonIcon from 'shared/components/atoms/PokemonIcon';

// helpers
import * as pokeutils from 'shared/utils/poke';

// style
if (process.env.BROWSER) require('./EggRewards.scss');

export default class EggRewards extends Component {
  static propTypes = {
    pokemons: PropTypes.array.isRequired
  };

  renderPokemonsByDistance(eggDistance = 2) {
    const { pokemons } = this.props;

    const filterPokemons = pokemons.filter((pokemon) => {
      return pokemon.egg === eggDistance;
    });

    const nodes = filterPokemons.map((pokemon) => {
      const nameStyle = pokeutils.getPokemonTypeBackground(pokemon.type);

      return (
        <GridCell key={pokemon.pokemonId} fit>
          <div className="EggReward-Pokemon">
            <LazyLoad throttle={300} height={120} offset={200}>
              <PokemonIcon pokemon={pokemon} />
            </LazyLoad>
            <span style={nameStyle}>{pokemon.name}</span>
          </div>
        </GridCell>
      );
    });

    const rewardDistanceCSS = cx('EggReward-Km', {
      [`EggReward-Km--${eggDistance}`]: eggDistance
    });

    return (
      <div className="EggReward">
        <div className={rewardDistanceCSS}>
          <span>{eggDistance}</span> km
        </div>
        <Grid className="EggReward-Pokemons" equalHeight withGutter>
          {nodes}
        </Grid>
      </div>
    );
  }

  renderList() {
    const egg2km = this.renderPokemonsByDistance(2);
    const egg5km = this.renderPokemonsByDistance(5);
    const egg10km = this.renderPokemonsByDistance(10);

    return (
      <div className="EggRewards-List">
        {egg2km}
        {egg5km}
        {egg10km}
      </div>
    );
  }

  render() {
    const nodes = this.renderList();

    return (
      <div className="EggRewards">
        <div className="Tag">
          <PokemonIcon item={{ img: 'egg' }} />
          <h1 className="Tag-Title">Egg Rewards</h1>
        </div>

        {nodes}
      </div>
    );
  }
}
