// deps
import React, { PropTypes } from 'react';
import cx from 'classnames';

// style
if (process.env.BROWSER) require('./GridCell.scss');

const GridCell = (props) => {
  const {
    className,
    col,
    fit,
    fill,
    full,
    center,
    children,
    ...otherProps } = props;

  const gridCellClasses = cx('GridCell', {
    'GridCell--center': center,
    'GridCell--fit': fit,
    'GridCell--fill': fill,
    'GridCell--full': full,
    [`GridCell--col${col}`]: col
  }, className);

  return (
    <div {...otherProps} className={gridCellClasses}>
      {children}
    </div>
  );
};

GridCell.propTypes = {
  col: PropTypes.number,
  center: PropTypes.bool,
  fit: PropTypes.bool,
  fill: PropTypes.bool,
  full: PropTypes.bool,
  className: PropTypes.string,
  children: PropTypes.node.isRequired
};

export default GridCell;
