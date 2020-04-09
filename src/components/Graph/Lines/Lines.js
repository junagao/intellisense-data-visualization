import React from 'react';
import PropTypes from 'prop-types';

import { LinesPoints } from 'components';
import LinePath from './Lines.styles';

const Lines = ({ metrics, onHover, transform, scales, marginLeft }) => {
  return metrics.map(({ metric, path, color, dataset }) => (
    <React.Fragment key={metric}>
      <LinePath
        d={path}
        stroke={color}
        transform={transform}
        onMouseOver={() => onHover(metric, color)}
        onFocus={() => onHover(metric, color)}
        onMouseOut={() => onHover(metric, color)}
        onBlur={() => onHover(metric, color)}
      />
      <LinesPoints
        metric={metric}
        dataset={dataset}
        marginLeft={marginLeft}
        color={color}
        scales={scales}
        onHover={onHover}
      />
    </React.Fragment>
  ));
};

Lines.propTypes = {
  metrics: PropTypes.arrayOf(
    PropTypes.shape({
      metric: PropTypes.string,
      path: PropTypes.string,
      color: PropTypes.string,
      dataset: PropTypes.arrayOf(
        PropTypes.shape({
          time: PropTypes.number,
          value: PropTypes.number,
        }),
      ),
    }),
  ).isRequired,
  onHover: PropTypes.func.isRequired,
  transform: PropTypes.string.isRequired,
  scales: PropTypes.shape({
    xScale: PropTypes.func,
    yScale: PropTypes.func,
  }).isRequired,
  marginLeft: PropTypes.number.isRequired,
};

export default Lines;
