// deps
import React, { Component, PropTypes } from 'react';

// components
import IconButton from 'material-ui/IconButton';
import IconInfo from 'material-ui/svg-icons/action/info-outline';

import PokepediaLogo from 'components/atoms/PokepediaLogo';
import PokepediaDrawer from 'components/modules/PokepediaDrawer';

export default class App extends Component {
  static propTypes = {
    children: PropTypes.node
  };

  constructor(props) {
    super(props);

    this.state = {
      drawerOpened: false
    };

    this.toggleDrawer = this.toggleDrawer.bind(this);
  }

  toggleDrawer() {
    this.setState({
      drawerOpened: !this.state.drawerOpened
    });
  }

  // @TODO: make this a component?
  renderInfoButton() {
    return (
      <div className="Pokepedia-InfoButton">
        <IconButton
          tooltip="About"
          tooltipPosition="bottom-center"
          onTouchTap={this.toggleDrawer}
        >
          <IconInfo className="Pokepedia-InfoButton-Icon" />
        </IconButton>
      </div>
    );
  }

  render() {
    const { drawerOpened } = this.state;
    const infoButton = this.renderInfoButton();

    return (
      <div className="App">
        <div className="Pokepedia-Header">
          <PokepediaLogo />
          {infoButton}
        </div>
        <PokepediaDrawer
          open={drawerOpened}
          onClickOut={this.toggleDrawer}
        />
        {this.props.children}
      </div>
    );
  }
}
