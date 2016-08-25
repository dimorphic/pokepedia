// deps
import React, { Component, PropTypes } from 'react';

// components
import { Grid, GridCell } from 'components/atoms/Grid';
import PokemonIcon from 'components/atoms/PokemonIcon';
import Paper from 'material-ui/Paper';
import Subheader from 'material-ui/Subheader';
// import FontIcon from 'material-ui/FontIcon';

// helpers
const isEmptySpace = /\s/g;

// style
import './LevelsRewards.scss';

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

  renderLevels() {
    const { items, levels } = this.props;

    if (!items.length || !levels.length) {
      return null;
    }

    const noUnlocks = (<span className="LevelReward-Unlocks-None">:(</span>);

    const nodes = levels.map((level) => {
      const rewards = level.rewards.map(this.renderRewards);
      const unlocks = level.unlocks ? this.renderUnlocks(level.unlocks) : noUnlocks;

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
            <GridCell col={1}>
              <div className="LevelReward-LevelNo">
                <span>{level.id}</span>
              </div>
            </GridCell>

            <GridCell col={4}>
              <div className="LevelReward-Unlocks">
                {unlocks}
              </div>
            </GridCell>

            <GridCell col={2}>
              <div className="LevelReward-XP">
                {level.xp.required} / {level.xp.total}
              </div>
            </GridCell>

            <GridCell col={5}>
              <div className="LevelReward-List">
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

    return (
      <div className="LevelRewards">
        {/* COLUMN HISTORY */}
        <Grid>
          <GridCell col={1}>
            <Subheader>Level</Subheader>
          </GridCell>

          <GridCell col={4}>
            <Subheader>Unlocks</Subheader>
          </GridCell>

          <GridCell col={2}>
            <Subheader>XP required / Total XP</Subheader>
          </GridCell>

          <GridCell col={5}>
            <Subheader>Reward goodies</Subheader>
          </GridCell>
        </Grid>

        {/* LEVELS */}
        {node}
      </div>
    );
  }
}
