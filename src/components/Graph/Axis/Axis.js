import React from 'react';
import PropTypes from 'prop-types';
import * as d3 from 'd3';

import AxisG from './Axis.styles';

const xAxisRef = React.createRef();
const yAxisRef = React.createRef();

const Axis = ({ scales, margin, svgDimensions }) => {
  const { xScale, yScale } = scales;
  const { marginTop, marginRight, marginBottom, marginLeft } = margin;
  const { width, height } = svgDimensions;

  const xAxis = d3
    .axisBottom(xScale)
    .tickSizeInner(-height + marginTop + marginBottom)
    .tickPadding(10);

  const yAxis = d3
    .axisLeft(yScale)
    .tickSizeInner(-width + marginLeft + marginRight)
    .tickPadding(10);

  d3.select(xAxisRef.current).call(xAxis);
  d3.select(yAxisRef.current).call(yAxis);

  return (
    <>
      <AxisG
        ref={xAxisRef}
        transform={`translate(-${marginLeft}, ${height - marginBottom})`}
      />
      <AxisG ref={yAxisRef} />
    </>
  );
};

Axis.propTypes = {
  margin: PropTypes.shape({
    marginTop: PropTypes.number,
    marginRight: PropTypes.number,
    marginBottom: PropTypes.number,
    marginLeft: PropTypes.number,
  }).isRequired,
  scales: PropTypes.shape({
    xScale: PropTypes.func,
    yScale: PropTypes.func,
  }).isRequired,
  svgDimensions: PropTypes.shape({
    width: PropTypes.number,
    height: PropTypes.number,
  }).isRequired,
};

export default Axis;
