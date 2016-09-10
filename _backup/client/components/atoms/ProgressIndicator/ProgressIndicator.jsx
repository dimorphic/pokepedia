// deps
import React, { PropTypes } from 'react';
import cx from 'classnames';

// style
if (process.env.BROWSER) {
  require('./ProgressIndicator.scss');
}

const ProgressIndicator = (props) => {
  const cssClasses = cx('ProgressIndicator', {
    'ProgressIndicator--loading': props.loading
  });

  return <div className={cssClasses}></div>;
};

ProgressIndicator.propTypes = {
  loading: PropTypes.bool
};

ProgressIndicator.defaultProps = {
  loading: false
};

export default ProgressIndicator;
