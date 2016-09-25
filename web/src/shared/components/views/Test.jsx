// deps
import React, { Component, PropTypes } from 'react';
import Helmet from 'react-helmet';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

// components
import RaisedButton from 'material-ui/RaisedButton';
// import RewardsPage from 'components/pages/RewardsPage';

// actions
import * as PokedexActions from 'shared/actions/pokedex';

// map store
const mapStoreToProps = (store) => ({
  items: store.pokedex.items,
  levels: store.pokedex.levels,
  pokemons: store.pokedex.pokemons
});

// map actions
const mapDispatchToProps = (dispatch) => ({
  actions: bindActionCreators(
    PokedexActions
  , dispatch)
});

@connect(mapStoreToProps, mapDispatchToProps)
class Test extends Component {
  static propTypes = {
    params: PropTypes.object,
    actions: PropTypes.object.isRequired,

    items: PropTypes.array,
    levels: PropTypes.array,
    pokemons: PropTypes.array
  }

  static needs = [
    PokedexActions.getPokemons
  ];

  componentDidMount() {
    console.log('MOUNT TEST.jsx!');
    // console.log('TEST PROPS @ ', this.props);
    this.fetchData();
  }

  fetchData() {
    const { actions } = this.props;
    console.log('>> GO FETCH DATA TEST.jSX');

    actions.getPokemons();
  }

  render() {
    return (
      <div>
        <Helmet title="Test!" />
        <div>test.jsx here bro</div>
        <pre>
          {this.props.items.length}
          {this.props.levels.length}
          {this.props.pokemons.length}
        </pre>
        <RaisedButton label="Sup" />
      </div>
    );
  }
}

export default Test;
