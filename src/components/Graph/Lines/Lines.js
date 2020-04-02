import React from 'react';
import PropTypes from 'prop-types';

import LinePath from './Lines.styles';

const Lines = ({ metrics, onHover, transform }) =>
  metrics.map(({ metric, path, color }) => (
    <LinePath
      key={metric}
      d={path}
      stroke={color}
      transform={transform}
      onMouseOver={() => onHover(metric, color)}
      onFocus={() => onHover(metric, color)}
      onMouseOut={() => onHover(metric, color)}
      onBlur={() => onHover(metric, color)}
    />
  ));

Lines.propTypes = {
  metrics: PropTypes.arrayOf(
    PropTypes.shape({
      metric: PropTypes.string,
      path: PropTypes.string,
      color: PropTypes.string,
    }),
  ).isRequired,
  onHover: PropTypes.func.isRequired,
  transform: PropTypes.string.isRequired,
};

export default Lines;
