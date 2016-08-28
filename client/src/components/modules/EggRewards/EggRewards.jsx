// deps
import React, { Component, PropTypes } from 'react';

// components
// import { Grid, GridCell } from 'components/atoms/Grid';
// import PokemonIcon from 'components/atoms/PokemonIcon';

// style
import './EggRewards.scss';

export default class EggRewards extends Component {
  static propTypes = {
    pokemons: PropTypes.array.isRequired
  };

  render() {
    return (
      <div>egg rewards here bro</div>
    );
  }
}
