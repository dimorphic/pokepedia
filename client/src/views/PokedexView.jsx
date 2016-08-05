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
const mapStoreToProps = (store) => ({});

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
    pokedex: PropTypes.object // .isRequired
  }

  // constructor(props) {
  //   super(props);
  // }

  componentDidMount() {
    this.fetchData();
  }

  fetchData() {
    console.log('>>> POKEDEX FETCH DATA');

    const { actions } = this.props;

    // PokedexAPI.getAllPokemons().then((response) => {
    //   console.log('API @ ', response.data);
    // });

    // fetch list of available widget components for builder
    actions.getPokemons();
  }

  render() {
    const { pokedex } = this.props;

    return (
      <PokedexPage pokemons={pokedex} />
    );
  }
}

export default PokedexContainer;
