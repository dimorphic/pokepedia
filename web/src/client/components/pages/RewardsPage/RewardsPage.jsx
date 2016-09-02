// deps
import React, { Component, PropTypes } from 'react';
import cx from 'classnames';

// components
import PokepediaLoader from 'components/atoms/PokepediaLoader';
import EggRewards from 'components/modules/EggRewards';
import LevelRewards from 'components/modules/LevelRewards';

// style
import './RewardsPage.scss';

export default class RewardsPage extends Component {
  static propTypes = {
    params: PropTypes.object,

    items: PropTypes.array,
    levels: PropTypes.array,
    pokemons: PropTypes.array
  };

  static defaultProps = {
    items: [],
    levels: [],
    pokemons: []
  };

  renderRewardModule(type) {
    if (!type) { return null; }

    const { items, levels, pokemons } = this.props;
    const showLoader = (<PokepediaLoader />);

    let node = null;

    switch (type) {
      case 'egg': {
        const hasPokemons = (pokemons && pokemons.length);
        node = hasPokemons ?
              (<EggRewards pokemons={pokemons} />) : showLoader;

        break;
      }

      case 'level':
      default: {
        const hasItems = (items && items.length);
        const hasLevels = (levels && levels.length);

        node = (hasItems && hasLevels) ?
              (<LevelRewards levels={levels} items={items} />) : showLoader;
      }
    }

    return node;
  }

  render() {
    const { type } = this.props.params;
    const node = this.renderRewardModule(type);

    return (
      <div className="Page RewardsPage">
        {node}
      </div>
    );
  }
}
