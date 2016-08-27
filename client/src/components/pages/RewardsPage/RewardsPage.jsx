// deps
import React, { Component, PropTypes } from 'react';

// components
import PokepediaLoader from 'components/atoms/PokepediaLoader';
import LevelsRewards from 'components/modules/LevelsRewards';

// style
import './RewardsPage.scss';

export default class RewardsPage extends Component {
  static propTypes = {
    items: PropTypes.array,
    levels: PropTypes.array
  };

  static defaultProps = {
    items: [],
    levels: []
  };

  render() {
    const { items, levels } = this.props;

    const hasItems = (items && items.length);
    const hasLevels = (levels && levels.length);

    let node;

    if (!hasItems || !hasLevels) {
      node = (<PokepediaLoader />);
    } else {
      node = (<LevelsRewards levels={levels} items={items} />);
    }

    return (
      <div className="Page RewardsPage">
        <div className="Tag">
          <i className="fa fa-gift" />
          <h1 className="Tag">Level Rewards</h1>
        </div>
        {node}
      </div>
    );
  }
}
