// deps
import React, { Component, PropTypes } from 'react';

// components
// import Avatar from 'material-ui/Avatar';
// import Paper from 'material-ui/Paper';
// import {
//   Table, TableHeader, TableHeaderColumn, TableBody, TableRow, TableRowColumn
// } from 'material-ui/Table';
// import Subheader from 'material-ui/Subheader';

import PokepediaLoader from 'components/atoms/PokepediaLoader';
import LevelsRewards from 'components/modules/LevelsRewards';
import FontIcon from 'material-ui/FontIcon';
// import PokemonIcon from 'components/atoms/PokemonIcon';
// import Paper from 'material-ui/Paper';

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

  // constructor(props) {
  //   super(props);
  //
  //   this.renderRewards = this.renderRewards.bind(this);
  // }

  // renderRewards(rewardItem) {
  //   const { items } = this.props;
  //   const { code, count } = rewardItem;
  //
  //   const item = items.find((it) => { return it.code === code; });
  //
  //   return (
  //     <div className="Reward-Item" key={`${count}_${item.code}`}>
  //       {count} x <PokemonIcon item={item} />
  //     </div>
  //   );
  // }

  // renderLevelRewards() {
  //   const { items, levels } = this.props;
  //
  //   if (!items.length || !levels.length) {
  //     return null;
  //   }
  //
  //   const nodes = levels.map((level) => {
  //     const rewards = level.rewards.map(this.renderRewards);
  //
  //     return (
  //       <TableRow key={level.id} className="Reward">
  //         <TableRowColumn className="Reward-Col">
  //           <div className="Reward-Level">
  //             <span>{level.id}</span>
  //           </div>
  //         </TableRowColumn>
  //         <TableRowColumn className="Reward-Col">
  //           {level.unlocks}
  //         </TableRowColumn>
  //         <TableRowColumn className="Reward-Col">
  //           {level.xp.required} / {level.xp.total}
  //         </TableRowColumn>
  //         <TableRowColumn className="Reward-Col">{rewards}</TableRowColumn>
  //       </TableRow>
  //     );
  //   });
  //
  //   return (
  //     <div className="RewardsList">
  //       <Subheader>Level rewards</Subheader>
  //       <Table
  //         selectable={false}
  //       >
  //         <TableHeader
  //           displaySelectAll={false}
  //           adjustForCheckbox={false}
  //         >
  //           <TableRow>
  //             <TableHeaderColumn>Level</TableHeaderColumn>
  //             <TableHeaderColumn>Unlocks</TableHeaderColumn>
  //             <TableHeaderColumn>XP required / Total XP</TableHeaderColumn>
  //             <TableHeaderColumn>Rewards goodies</TableHeaderColumn>
  //           </TableRow>
  //         </TableHeader>
  //         <TableBody displayRowCheckbox={false}>
  //           {nodes}
  //         </TableBody>
  //       </Table>
  //     </div>
  //   );
  // }

  render() {
    // const levels = this.renderLevelRewards();
    // const node = levels || (<PokepediaLoader />);

    const { items, levels } = this.props;

    let node;

    if (!items || !levels) {
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
