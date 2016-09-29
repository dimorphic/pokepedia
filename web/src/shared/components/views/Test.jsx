// deps
import React, { Component, PropTypes } from 'react';
import Helmet from 'react-helmet';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { fetchNeeds } from 'shared/utils/fetchComponentData';

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
  dispatch,
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

  static defaultProps = {
    items: [],
    levels: [],
    pokemons: []
  };

  static needs = [
    PokedexActions.getPokemons
  ];

  componentDidMount() {
    console.log('MOUNT TEST.jsx !!', this.props);
    // console.log('TEST PROPS @ ', this.props);
    this.fetchData();
  }

  fetchData() {
    const { actions } = this.props;
    console.log('>> GO FETCH DATA TEST.jSX');

    // actions.getPokemons();
    fetchNeeds(Test.needs, this.props);
  }

  render() {
    const { items, levels, pokemons } = this.props;

    return (
      <div>
        <Helmet
          title="Test!"
          meta={[
            {
              name: 'description',
              content: 'dis is a test page'
            }
          ]}
        />
        <div>test.jsx here bro</div>
        <pre>
          {items.length}
          {levels.length}
          {pokemons.length}
        </pre>
        <RaisedButton label="Sup" />
      </div>
    );
  }
}

export default Test;
