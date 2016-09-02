// deps
import React, { Component, PropTypes } from 'react';

// components
import PokepediaLoader from 'components/atoms/PokepediaLoader';
import PokeCard from 'components/atoms/PokeCard';

import RouterLink from 'components/atoms/RouterLink';

// style
import './PokemonPage.scss';

const MENU_TEST = [
  {
    name: 'Poke #01',
    to: '/pokemon/7'
  },
  {
    name: 'Poke #02',
    to: '/pokemon/21'
  },
  {
    name: 'Poke test',
    to: '/pokemon/32'
  },
  {
    name: 'Poke #087',
    to: '/pokemon/87'
  }
];

export default class PokemonPage extends Component {
  static propTypes = {
    pokemon: PropTypes.object
  };

  render() {
    const { pokemon } = this.props;

    const links = MENU_TEST.map((link, key) => {
      return (
        <RouterLink key={key} to={link.to} className="link">
            {link.name}
        </RouterLink>
      );
    });

    const node = pokemon ? (<PokeCard pokemon={pokemon} />) : (<PokepediaLoader />);

    return (
      <div className="Page PokemonPage">
        {null}
        {node}
      </div>
    );
  }
}
