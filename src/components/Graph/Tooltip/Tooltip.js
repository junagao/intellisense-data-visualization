import React from 'react';
import PropTypes from 'prop-types';

import { TooltipDiv, TooltipH1, TooltipP, TooltipSpan } from './Tooltip.styles';

const Tooltip = ({ x, y, color, metric, time, value }) => (
  <TooltipDiv x={x} y={y}>
    <TooltipH1 color={color}>{metric}</TooltipH1>
    {time && value ? (
      <>
        <TooltipP>
          <TooltipSpan>time:</TooltipSpan> {time}
        </TooltipP>
        <TooltipP>
          <TooltipSpan>value:</TooltipSpan> {value}
        </TooltipP>
      </>
    ) : null}
  </TooltipDiv>
);

Tooltip.propTypes = {
  color: PropTypes.string.isRequired,
  metric: PropTypes.string.isRequired,
  time: PropTypes.string.isRequired,
  value: PropTypes.string.isRequired,
  x: PropTypes.number.isRequired,
  y: PropTypes.number.isRequired,
};

export default Tooltip;
