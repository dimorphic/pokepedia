// deps
import React, { Component, PropTypes } from 'react';
import RouterLink from 'shared/components/atoms/RouterLink';

// style
if (process.env.BROWSER) require('./NavigationMenu.scss');

const NAVIGATION = [
  {
    name: 'Pokédex',
    to: '/'
  },
  {
    name: 'Level Rewards',
    to: '/rewards/level'
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
