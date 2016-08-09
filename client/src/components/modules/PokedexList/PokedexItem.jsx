// deps
import React, { Component, PropTypes } from 'react';

// components
import Paper from 'material-ui/Paper';
import PokemonIcon from 'components/atoms/PokemonIcon';

// style
import './PokedexItem.scss';

const paperStyle = {
  // height: 100,
  width: '100%',
  // margin: 20,
  textAlign: 'center',
  display: 'inline-block'
};

const PokedexItem = (props) => {
  const { pokemon, ...otherProps } = props;

  return (
    <div className="PokedexItem" {...otherProps}>
      <div className="PokedexItem-Wrapper">
        <div className="PokedexItem-Avatar">
          <PokemonIcon pokemon={pokemon} />
        </div>
        <h2 className="PokedexItem-Name">{pokemon.name}</h2>
        <span className="PokedexItem-No">#{pokemon.id}</span>
      </div>
      <div className="PokedexItem-Circle"></div>
    </div>
  );
};

PokedexItem.propTypes = {
  pokemon: PropTypes.object
};

export default PokedexItem;
