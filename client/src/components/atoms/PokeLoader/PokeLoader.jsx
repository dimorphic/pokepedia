// deps
import React, { Component, PropTypes } from 'react';

// style
import './PokeLoader.scss';

const PokeLoader = (props) => {
  return (
    <div className="PokeLoader">
      <div id="pikachu"></div>
      <div id="ash"></div>
    </div>
  );
};

export default PokeLoader;
