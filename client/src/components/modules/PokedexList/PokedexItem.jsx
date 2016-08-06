// deps
import React, { Component, PropTypes } from 'react';

// components
import Paper from 'material-ui/Paper';

const paperStyle = {
  // height: 100,
  width: '100%',
  // margin: 20,
  textAlign: 'center',
  display: 'inline-block'
};

const PokedexItem = (props) => {
  const { pokemon, ...otherProps } = props;

  const pokemonImage = `http://www.serebii.net/pokemongo/pokemon/${pokemon.pokemonId}.png`;

  return (
    <div className="PokedexItem" {...otherProps}>
      <div className="PokedexItem-Wrapper">
        <div className="PokedexItem-Avatar">
          <img className="img-fluid" src={pokemonImage} alt={pokemon.name} />
        </div>
        <h1 className="PokedexItem-Name">{pokemon.name}</h1>
      </div>
      <div className="PokedexItem-Circle"></div>
    </div>
  );
};

PokedexItem.propTypes = {
  pokemon: PropTypes.object
};

export default PokedexItem;
