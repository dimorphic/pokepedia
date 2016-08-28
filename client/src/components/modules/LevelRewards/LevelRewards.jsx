// deps
import React, { Component, PropTypes } from 'react';
import numeral from 'numeral';

// components
import { Grid, GridCell } from 'components/atoms/Grid';
import PokemonIcon from 'components/atoms/PokemonIcon';
// import FontIcon from 'material-ui/FontIcon';

// helpers
const isEmptySpace = /\s/g;

// style
import './LevelRewards.scss';

export default class LevelRewards extends Component {
  static propTypes = {
    items: PropTypes.array.isRequired,
    levels: PropTypes.array.isRequired
  };

  constructor(props) {
    super(props);

    this.getItemByCode = this.getItemByCode.bind(this);
    this.renderRewards = this.renderRewards.bind(this);
  }

  getItemByCode(itemCode) {
    const { items } = this.props;

    return items.find((it) => { return it.code === itemCode; });
  }

  renderLevelsHistory() {
    return (
      <div className="LevelRewards-History">
        <Grid withGutter>
          <GridCell col={1}>
            <div className="LevelRewards-HistoryTitle">Level</div>
          </GridCell>

          <GridCell col={2}>
            <div className="LevelRewards-HistoryTitle">XP required / Total XP</div>
          </GridCell>

          <GridCell col={4}>
            <div className="LevelRewards-HistoryTitle">Unlocks</div>
          </GridCell>

          <GridCell col={5}>
            <div className="LevelRewards-HistoryTitle">Reward goodies</div>
          </GridCell>
        </Grid>
      </div>
    );
  }

  renderLevels() {
    const { items, levels } = this.props;

    if (!items.length || !levels.length) {
      return null;
    }

    const noUnlocks = (<span className="LevelReward-Unlocks-None">:(</span>);

    const nodes = levels.map((level) => {
      const rewards = level.rewards.length ? level.rewards.map(this.renderRewards) : noUnlocks;
      const unlocks = level.unlocks ? this.renderUnlocks(level.unlocks) : noUnlocks;

      const xpRequired = numeral(level.xp.required).format('0,0');
      const xpTotal = numeral(level.xp.total).format('0,0');

      return (
        <div
          key={level.id}
          className="LevelReward"
        >
          <Grid
            flow="row"
            withGutter
            align="middle"
          >
            <GridCell col={1} className="LevelReward-LevelNo">
              <div className="LevelReward-LevelNo-Circle">
                <span>{level.id}</span>
              </div>
            </GridCell>

            <GridCell col={2} className="LevelReward-XP">
              <div className="LevelReward-Label">XP required / Total XP</div>
              {xpRequired} / {xpTotal}
            </GridCell>

            <div className="Pokepedia-Sepa"></div>
            <GridCell col={4} className="LevelReward-Unlocks">
              <div className="LevelReward-Label">Unlocks</div>
              {unlocks}
            </GridCell>
            <div className="Pokepedia-Sepa"></div>

            <GridCell col={5} className="LevelReward-RewardList">
              <div className="LevelReward-List">
                <div className="LevelReward-Label">Reward goodies</div>
                {rewards}
              </div>
            </GridCell>
          </Grid>
        </div>
      );
    });

    return nodes;
  }

  renderUnlocks(unlock) {
    // 'convert' to array so we can parse
    const unlocks = unlock.split(',');

    const items = unlocks.map((it, idx) => {
      // clean and transform item name
      const unlockItem = it.replace(isEmptySpace, '').toLowerCase();

      // check for plural version of the word and extract item code
      const itemCode = (unlockItem.substr(-1) === 's') ? unlockItem.slice(0, -1) : unlockItem;

      // get item
      const item = this.getItemByCode(itemCode);

      const itemIcon = item ? (<PokemonIcon key={item.id} item={item} />) : null;

      return (
        <div className="LevelReward-Item" key={`${idx}_${unlockItem}`}>
          {itemIcon}
          <span>{it}</span>
        </div>
      );
    });

    return items;
  }

  renderRewards(rewardItem) {
    const { code, count } = rewardItem;
    const item = this.getItemByCode(code);

    return (
      <div className="LevelReward-Item" key={`${count}_${item.code}`}>
        <span>{count} x</span>
        <PokemonIcon item={item} />
      </div>
    );
  }

  render() {
    const node = this.renderLevels();
    const historyLabels = this.renderLevelsHistory();

    return (
      <div className="LevelRewards">
        {/* COLUMN HISTORY */}
        {historyLabels}

        {/* LEVELS */}
        {node}
      </div>
    );
  }
}
