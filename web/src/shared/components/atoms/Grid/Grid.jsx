// deps
import React, { PropTypes } from 'react';
import cx from 'classnames';
import { capitalize } from 'lodash';

// style
if (process.env.BROWSER) require('./Grid.scss');

const Grid = (props) => {
  const {
    className,
    align,
    fit,
    flow,
    equalHeight,
    withGutter,
    spaceAround,
    children,
    ...otherProps } = props;

  const gridClasses = cx('Grid', {
    [`Grid--flow${capitalize(flow)}`]: flow,
    [`Grid--align${capitalize(align)}`]: align,
    'Grid--fit': fit,
    'Grid--equalHeight': equalHeight,
    'Grid--withGutter': withGutter,
    'Grid--spaceAround': spaceAround
  }, className);


  return (
    <div {...otherProps} className={gridClasses}>
      {children}
    </div>
  );
};

Grid.propTypes = {
  align: PropTypes.oneOf(['center', 'right', 'middle', 'bottom']),
  fit: PropTypes.bool,
  flow: PropTypes.oneOf(['row', 'column']),
  equalHeight: PropTypes.bool,
  withGutter: PropTypes.bool,
  className: PropTypes.string,
  spaceAround: PropTypes.bool,
  children: PropTypes.node
};

Grid.defaultProps = {
  flow: 'row'
};

export default Grid;
