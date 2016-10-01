// deps
import React, { Component, PropTypes } from 'react';

// components
import PokepediaLoader from 'shared/components/atoms/PokepediaLoader';
import PokeCard from 'shared/components/atoms/PokeCard';

import RouterLink from 'shared/components/atoms/RouterLink';

// style
if (process.env.BROWSER) require('./PokemonPage.scss');

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

  buildLink(label, url) {
    return (
      <RouterLink to={`/pokemon/${url}`} className="link">
        {label}
      </RouterLink>
    );
  }

  render() {
    const { pokemon } = this.props;

    const links = MENU_TEST.map((link, key) => {
      return (
        <RouterLink key={key} to={link.to} className="link">
            {link.name}
        </RouterLink>
      );
    });

    const prev = (pokemon && pokemon.id > 1) ? this.buildLink(`<< Prev (${pokemon.id-1})`, pokemon.id - 1) : null;
    const next = (pokemon && pokemon.id < 151) ? this.buildLink(`Next (${pokemon.id+1}) >>`, pokemon.id + 1) : null;

    const node = pokemon ? (<PokeCard pokemon={pokemon} />) : (<PokepediaLoader />);

    return (
      <div className="Page PokemonPage">
        {prev}
        {next}
        {node}
      </div>
    );
  }
}
