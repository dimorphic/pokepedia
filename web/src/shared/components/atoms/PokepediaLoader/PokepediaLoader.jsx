// deps
import React, { PropTypes } from 'react';

// components
import CircularProgress from 'material-ui/CircularProgress';

// style
if (process.env.BROWSER) require('./PokepediaLoader.scss');

const PokepediaLoader = (props) => {
  const { showTip } = props;

  const tip = !showTip ? null : (
    <div className="Pokepedia-Tip">
      Tip: {props.tip}
    </div>
  );

  return (
    <div className="PokepediaLoader">
      <CircularProgress color={'#9416ff'} />
      {tip}
    </div>
  );
};

PokepediaLoader.propTypes = {
  showTip: PropTypes.bool,
  tip: PropTypes.string
};

PokepediaLoader.defaultProps = {
  showTip: true,
  tip: 'Pay attention to the road... :)'
};

export default PokepediaLoader;
