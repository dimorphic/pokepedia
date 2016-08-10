// deps
import React, { PropTypes } from 'react';

const PokemonIcon = (props) => {
  const { pokemon, animated, ...otherProps } = props;

  // static PNG
  const pokemonImage = `http://localhost:8800/assets/pokemons/${pokemon.pokemonId}.png`;

  // @TODO: add props.animated and switch to GIF ?
  // const pokemonImage = `http://www.pokestadium.com/sprites/xy/${pokemon.name.toLowerCase()}.gif`;
  // const pokemonImage = `http://www.pkparaiso.com/imagenes/xy/sprites/animados/${pokemon.name.toLowerCase()}.gif`;
  // const pokemonImage = `http://pokemon-online.eu/images/pokemon/x-y/animated/${pokemon.pokemonId}.gif`;

  return (
    <div className="PokemonIcon" {...otherProps}>
      <img className="img-fluid" src={pokemonImage} alt={pokemon.name} />
    </div>
  );
};

PokemonIcon.propTypes = {
  pokemon: PropTypes.object,
  animated: PropTypes.bool
};

PokemonIcon.defaultProps = {
  animated: false
};

export default PokemonIcon;
