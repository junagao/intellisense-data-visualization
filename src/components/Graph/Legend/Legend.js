import React from 'react';
import PropTypes from 'prop-types';

import LegendText from './Legend.styles';

const Legend = ({ x, y, fill, hover, text }) => (
  <LegendText x={x - 90} y={y - 30} dy="0.25rem" fill={fill} hover={hover}>
    {text}
  </LegendText>
);

Legend.propTypes = {
  hover: PropTypes.bool.isRequired,
  text: PropTypes.string.isRequired,
  fill: PropTypes.string.isRequired,
  x: PropTypes.number.isRequired,
  y: PropTypes.number.isRequired,
};

export default Legend;
