// deps
import React, { Component, PropTypes } from 'react';
import RouterLink from 'components/atoms/RouterLink';

// style
import './NavigationMenu.scss';

const NAVIGATION = [
  {
    name: 'Pokédex',
    to: '/'
  },
  {
    name: 'Level Rewards',
    to: '/rewards'
  },
  {
    name: 'Egg Rewards',
    to: '/rewards/egg'
  }
];

export default function NavigationMenu(props) {
  const links = NAVIGATION.map((link, key) => {
    return (
      <RouterLink
        key={key}
        to={link.to}
        className="NavigationMenu-Item"
        activeClassName="NavigationMenu-Item--active"
      >
        <div className="NavigationMenu-Link">
          {link.name}
          <i />
        </div>
      </RouterLink>
    );
  });

  return (
    <div className="NavigationMenu">
      {links}
    </div>
  );
}
