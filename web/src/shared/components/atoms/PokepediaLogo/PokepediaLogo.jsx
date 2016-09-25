// deps
import React from 'react';

// style
if (process.env.BROWSER) require('./PokepediaLogo.scss');

const PokepediaLogo = () => {
  return (
    <div className="PokepediaLogo">
      <div className="PokepediaLogo-ThxKevin">
        <div className="pikachu"></div>
        <div className="ash"></div>
      </div>
      <h1 className="PokepediaLogo-Name">Poképedia</h1>
      <span className="PokepediaLogo-Version">Beta</span>
    </div>
  );
};

export default PokepediaLogo;
