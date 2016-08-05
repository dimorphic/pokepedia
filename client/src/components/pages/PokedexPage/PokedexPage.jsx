// deps
import React, { Component, PropTypes } from 'react';

// components
// import WidgetSlot from 'components/partials/WidgetSlot';

// style
import './PokedexPage.scss';

export default class PokedexPage extends Component {
  static propTypes = {
    // pokemons: PropTypes.object.isRequired
  };

  static defaultProps = {
  };

  render() {
    // const { pokemons } = this.props;

    return (
      <div className="PokedexPage">
        <h1>pokepage here</h1>

        poke list map here
      </div>
    );
  }
}
