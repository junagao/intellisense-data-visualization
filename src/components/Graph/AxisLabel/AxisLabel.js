import React from 'react';
import PropTypes from 'prop-types';

import AxisLabelText from './AxisLabel.styles';

const AxisLabel = ({ x, y, dy, transform, label }) => (
  <AxisLabelText x={x} y={y} dy={dy} transform={transform}>
    {label}
  </AxisLabelText>
);

AxisLabel.propTypes = {
  dy: PropTypes.string,
  transform: PropTypes.string,
  x: PropTypes.number.isRequired,
  y: PropTypes.number.isRequired,
  label: PropTypes.string.isRequired,
};

AxisLabel.defaultProps = {
  dy: null,
  transform: null,
};

export default AxisLabel;
