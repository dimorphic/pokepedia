// deps
import React, { PropTypes } from 'react';

// components
import CircularProgress from 'material-ui/CircularProgress';

// style
import './PokepediaLoader.scss';

const PokepediaLoader = (props) => {
  return (
    <div className="PokepediaLoader">
      <CircularProgress color={'#9416ff'} />
      <div className="PokedexPage-Tip">
        Tip: {props.tip}
      </div>
    </div>
  );
};

PokepediaLoader.propTypes = {
  tip: PropTypes.string
};

PokepediaLoader.defaultProps = {
  tip: 'Pay attention to the road... :)'
};

export default PokepediaLoader;
