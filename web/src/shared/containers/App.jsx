// deps
import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import Helmet from 'react-helmet';

// components
import IconButton from 'material-ui/IconButton';
import IconInfo from 'material-ui/svg-icons/action/info-outline';

import ProgressIndicator from 'shared/components/atoms/ProgressIndicator';
import PokepediaLogo from 'shared/components/atoms/PokepediaLogo';
import PokepediaDrawer from 'shared/components/modules/PokepediaDrawer';
import NavigationMenu from 'shared/components/modules/NavigationMenu';

// map store to props
const mapStoreToProps = (store) => {
  return {
    appIsLoading: (store.global.requestsInProgress > 0)
  };
};

@connect(mapStoreToProps, null)
export default class App extends Component {
  static propTypes = {
    appIsLoading: PropTypes.bool,
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
    const { appIsLoading } = this.props;
    const { drawerOpened } = this.state;

    const infoButton = this.renderInfoButton();

    // onChangeClientState={(newState) => console.log(newState)}

    return (
      <div className="App">
        <Helmet
          title="App"
          titleTemplate="%s - SSR"
          meta={[
            { 'char-set': 'utf-8' },
            {
              'name': 'description',
              'content': 'My super dooper SSR app!'
            }
          ]}
        />
        <div>hello from App container!?</div>
        <ProgressIndicator loading={appIsLoading} />
        <div className="Pokepedia-Header">
          <PokepediaLogo />
          {infoButton}
        </div>
        <PokepediaDrawer
          open={drawerOpened}
          onClickOut={this.toggleDrawer}
        />
        <NavigationMenu />
        {this.props.children}
      </div>
    );
  }
}
