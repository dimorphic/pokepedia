// deps
import React, { PropTypes } from 'react';
import LazyLoad from 'react-lazyload';

// components
import PokemonIcon from 'components/atoms/PokemonIcon';

// style
import './PokedexItem.scss';

const PokedexItem = (props) => {
  const { pokemon, ...otherProps } = props;

  return (
    <div className="PokedexItem" {...otherProps}>
      <div className="PokedexItem-Wrapper">
        <div className="PokedexItem-Avatar">
          <LazyLoad throttle={300} height={120} offset={300}>
            <PokemonIcon pokemon={pokemon} />
          </LazyLoad>
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
