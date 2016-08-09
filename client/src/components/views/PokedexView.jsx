// deps
import React, { Component, PropTypes } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

// components
import PokedexPage from 'components/pages/PokedexPage';

// actions
// import * as PokedexAPI from 'api/pokedex';
import * as PokedexActions from 'actions/pokedex';

// console.log('poke api @ ', PokedexAPI);

// map store
const mapStoreToProps = (store) => ({
  pokedex: store.pokedex
});

// map actions
const mapDispatchToProps = (dispatch) => ({
  actions: bindActionCreators(
    PokedexActions
  , dispatch)
});

@connect(mapStoreToProps, mapDispatchToProps)
class PokedexContainer extends Component {
  static propTypes = {
    actions: PropTypes.object.isRequired,
    pokedex: PropTypes.any.isRequired
  }

  // constructor(props) {
  //   super(props);
  // }

  componentDidMount() {
    this.fetchData();
  }

  fetchData() {
    const { actions } = this.props;

    // fetch list of available widget components for builder
    actions.getPokemons();
  }

  render() {
    const { pokedex } = this.props;

    return (
      <PokedexPage pokedex={pokedex} />
    );
  }
}

export default PokedexContainer;
