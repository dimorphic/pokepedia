// deps
import React, { PropTypes } from 'react';

const PokemonIcon = (props) => {
  // accept Pokemon or Item id
  const { pokemon, item, animated, ...otherProps } = props;

  let imgSrc = null;
  let node = null;

  // static PNG
  if (pokemon) {
    // @TODO: add props.animated and switch to GIF ?
    // imgSrc = `http://www.pokestadium.com/sprites/xy/${pokemon.name.toLowerCase()}.gif`;
    // imgSrc = `http://www.pkparaiso.com/imagenes/xy/sprites/animados/${pokemon.name.toLowerCase()}.gif`;
    // imgSrc = `http://pokemon-online.eu/images/pokemon/x-y/animated/${pokemon.pokemonId}.gif`;

    imgSrc = `http://www.serebii.net/pokemongo/pokemon/${pokemon.pokemonId}.png`;
    node = (<img className="img-fluid" src={imgSrc} title={pokemon.name} alt={pokemon.name} />);
  }

  if (item) {
    imgSrc = `/assets/items/${item.img}.png`;
    node = (<img className="img-fluid" src={imgSrc} title={item.name} alt={item.name} />);
  }

  return (
    <div className="PokemonIcon" {...otherProps}>
      {node}
    </div>
  );
};

PokemonIcon.propTypes = {
  animated: PropTypes.bool,
  item: PropTypes.object,
  pokemon: PropTypes.object
};

PokemonIcon.defaultProps = {
  animated: false
};

export default PokemonIcon;
