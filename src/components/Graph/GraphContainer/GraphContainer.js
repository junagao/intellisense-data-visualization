import React from 'react';
import PropTypes from 'prop-types';
import * as d3 from 'd3';

import { Axis, AxisLabel, Lines, Legend } from 'components';
import { GraphDiv, GraphSvg } from './GraphContainer.styles';

const width = 650;
const height = 450;
const margin = { top: 30, right: 5, bottom: 45, left: 80 };
const lineColors = [
  '#4EAF63',
  '#EC624F',
  '#DBC36C',
  '#F369A3',
  '#FDB462',
  '#CCEBC5',
  '#B3DE69',
  '#E04530',
  '#8DD3C7',
  '#8BC0E4',
  '#5676DC',
  '#5664C7',
  '#8952A5',
  '#BC80BD',
  '#BDB4DE',
  '#FCCDE5',
  '#FFED6F',
  '#949494',
];

const GraphContainer = ({
  data,
  selectedMetrics,
  onMouseMove,
  onLineHover,
  legendXPosition,
  legendYPosition,
  hoveredMetricColor,
  hoverLineGraph,
  hoveredMetric,
}) => {
  if (!data && !selectedMetrics) return {};

  const { top, right, bottom, left } = margin;

  const dataToDraw = selectedMetrics.length ? selectedMetrics : data;

  const xMin = d3.min(dataToDraw, ({ dataset }) =>
    d3.min(dataset, ({ time }) => time),
  );

  const xMax = d3.max(dataToDraw, ({ dataset }) =>
    d3.max(dataset, ({ time }) => time),
  );

  const yMax = d3.max(dataToDraw, ({ dataset }) =>
    d3.max(dataset, ({ value }) => value),
  );

  const xScale = d3
    .scaleLinear()
    .domain([xMin, xMax])
    .range([left, width - right]);

  const yScale = d3
    .scaleLinear()
    .domain([0, yMax])
    .range([height - bottom, top]);

  const metricNames = dataToDraw.map(({ metric }) => metric);

  const color = d3.scaleOrdinal().domain(metricNames).range(lineColors);

  const metrics = dataToDraw.map((item) => {
    const line = d3
      .line()
      .x((d) => xScale(d.time))
      .y((d) => yScale(d.value))
      .curve(d3.curveNatural)(item.dataset);

    return {
      metric: item.metric,
      path: line,
      color: color(item.metric),
    };
  });

  return (
    <GraphDiv>
      <GraphSvg
        width={width + left + right}
        height={height + bottom}
        onMouseMove={onMouseMove}
      >
        <g transform={`translate(${left}, 0)`}>
          <Axis
            scales={{ xScale, yScale }}
            margin={margin}
            svgDimensions={{ width, height }}
          />
          <AxisLabel
            x={-height / 2}
            y={right - left}
            dy="1rem"
            transform="rotate(-90)"
            label="Values"
          />
          <AxisLabel
            x={width / 2 - left - right}
            y={height + 5}
            label="Times"
          />
          <Lines
            metrics={metrics}
            transform={`translate(-${left}, 0)`}
            onLineHover={onLineHover}
          />
          <Legend
            x={legendXPosition}
            y={legendYPosition}
            fill={hoveredMetricColor}
            hover={hoverLineGraph}
            text={hoveredMetric}
          />
        </g>
      </GraphSvg>
    </GraphDiv>
  );
};

GraphContainer.propTypes = {
  data: PropTypes.arrayOf(
    PropTypes.shape({
      metric: PropTypes.string,
      dataset: PropTypes.arrayOf(
        PropTypes.shape({
          time: PropTypes.number,
          value: PropTypes.number,
        }),
      ),
    }),
  ).isRequired,
  selectedMetrics: PropTypes.arrayOf(
    PropTypes.shape({
      metric: PropTypes.string,
      dataset: PropTypes.arrayOf(
        PropTypes.shape({
          time: PropTypes.number,
          value: PropTypes.number,
        }),
      ),
    }),
  ).isRequired,
  onMouseMove: PropTypes.func.isRequired,
  onLineHover: PropTypes.func.isRequired,
  legendXPosition: PropTypes.number.isRequired,
  legendYPosition: PropTypes.number.isRequired,
  hoveredMetricColor: PropTypes.string.isRequired,
  hoverLineGraph: PropTypes.bool.isRequired,
  hoveredMetric: PropTypes.string.isRequired,
};

export default GraphContainer;
