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

  renderRewardTitleTag(title, icon) {
    const tagIcon = cx('Tag-Icon fa', {
      [`fa-${icon}`]: icon
    });

    const tagTitle = title.charAt(0).toUpperCase() + title.slice(1);

    return (
      <div className="Tag">
        <i className={tagIcon} />
        <h1 className="Tag-Title">{tagTitle} Rewards</h1>
      </div>
    );
  }

  render() {
    const { items, levels } = this.props;

    console.log('!!! REWARDS PAGE PARAMS : ', this.props.params);

    const hasItems = (items && items.length);
    const hasLevels = (levels && levels.length);

    let node;

    if (!hasItems || !hasLevels) {
      node = (<PokepediaLoader />);
    } else {
      node = (<LevelRewards levels={levels} items={items} />);
    }

    const tag = this.renderRewardTitleTag('level', 'gift');

    return (
      <div className="Page RewardsPage">
        {tag}
        {node}
      </div>
    );
  }
}
