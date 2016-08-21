// deps
import React, { Component, PropTypes } from 'react';

// components
import PokepediaLoader from 'components/atoms/PokepediaLoader';

// style
import './RewardsPage.scss';

export default class RewardsPage extends Component {
  static propTypes = {
    pokedex: PropTypes.object
  };

  render() {
    const { pokedex } = this.props;

    console.log('rewards pokedex @ ', pokedex);

    const node = (<PokepediaLoader />);

    return (
      <div className="Page RewardsPage">
        {node}
      </div>
    );
  }
}
