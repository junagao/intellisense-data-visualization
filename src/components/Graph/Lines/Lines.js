import React from 'react';
import PropTypes from 'prop-types';

import LinePath from './Lines.styles';

const Lines = ({ metrics, onLineHover, transform }) =>
  metrics.map(({ metric, path, color }) => (
    <LinePath
      key={metric}
      d={path}
      stroke={color}
      transform={transform}
      onMouseOver={() => onLineHover(metric, color)}
      onFocus={() => onLineHover(metric, color)}
      onMouseOut={() => onLineHover(metric, color)}
      onBlur={() => onLineHover(metric, color)}
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
  onLineHover: PropTypes.func.isRequired,
  transform: PropTypes.string.isRequired,
};

export default Lines;
