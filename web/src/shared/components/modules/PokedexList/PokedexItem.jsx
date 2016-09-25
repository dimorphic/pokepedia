// deps
import React, { PropTypes } from 'react';
// import LazyLoad from 'react-lazyload';

// components
import PokemonIcon from 'components/atoms/PokemonIcon';

// style
if (process.env.BROWSER) require('./PokedexItem.scss');

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
