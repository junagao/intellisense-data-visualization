import React from 'react';
import PropTypes from 'prop-types';
import { v4 as uuidv4 } from 'uuid';

const LinesPoints = ({
  metric,
  dataset,
  marginLeft,
  color,
  scales,
  onHover,
}) => {
  const { xScale, yScale } = scales;
  return (
    <g fill={color}>
      {dataset.map(({ time, value }) => (
        <circle
          key={uuidv4()}
          cx={xScale(time) - marginLeft}
          cy={yScale(value)}
          r="3"
          stroke="#fff"
          onMouseOver={() => onHover(metric, color, time, value)}
          onFocus={() => onHover(metric, color, time, value)}
          onMouseOut={() => onHover(metric, color, time, value)}
          onBlur={() => onHover(metric, color, time, value)}
        />
      ))}
    </g>
  );
};

LinesPoints.propTypes = {
  color: PropTypes.string.isRequired,
  dataset: PropTypes.arrayOf(
    PropTypes.shape({
      time: PropTypes.number,
      value: PropTypes.number,
    }),
  ).isRequired,
  marginLeft: PropTypes.number.isRequired,
  metric: PropTypes.string.isRequired,
  onHover: PropTypes.func.isRequired,
  scales: PropTypes.shape({
    xScale: PropTypes.func,
    yScale: PropTypes.func,
  }).isRequired,
};

export default LinesPoints;
