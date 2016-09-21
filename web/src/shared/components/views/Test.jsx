// deps
import React, { Component, PropTypes } from 'react';
import Helmet from 'react-helmet';
// import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

// components
import RaisedButton from 'material-ui/RaisedButton';
// import RewardsPage from 'components/pages/RewardsPage';

// actions
// import * as PokedexActions from 'actions/pokedex';

// map store
const mapStoreToProps = (store) => ({
  items: store.pokedex.items,
  levels: store.pokedex.levels,
  pokemons: store.pokedex.pokemons
});

// map actions
// const mapDispatchToProps = (dispatch) => ({
//   actions: bindActionCreators(
//     PokedexActions
//   , dispatch)
// });

@connect(mapStoreToProps, null)
class Test extends Component {
  static propTypes = {
    params: PropTypes.object,
    // actions: PropTypes.object.isRequired,

    items: PropTypes.array,
    levels: PropTypes.array,
    pokemons: PropTypes.array
  }

  componentDidMount() {
    // this.fetchData();
    console.log('TEST PROPS @ ', this.props);
  }

  fetchData() {
    console.log('>> GO FETCH DATA TEST.jSX');
  }

  render() {
    return (
      <div>
        <Helmet title="Test!" />
        <div>test.jsx here bro</div>
        <RaisedButton label="Sup" />
      </div>
    );
  }
}

export default Test;
