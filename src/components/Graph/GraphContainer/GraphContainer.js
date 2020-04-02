import React from 'react';
import PropTypes from 'prop-types';
import * as d3 from 'd3';

import { Axis, AxisLabel, Lines, Tooltip } from 'components';
import { GraphDiv, GraphSvg } from './GraphContainer.styles';

const chartSettings = {
  width: 650,
  height: 450,
  marginTop: 30,
  marginRight: 5,
  marginBottom: 45,
  marginLeft: 80,
  lineColors: [
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
  ],
};

const GraphContainer = ({
  data,
  selectedMetrics,
  onMouseMove,
  onHover,
  legendXPosition,
  legendYPosition,
  hoveredMetricColor,
  hoverLineGraph,
  hoveredMetric,
  hoveredTime,
  hoveredValue,
}) => {
  if (!data && !selectedMetrics) return {};

  const {
    width,
    height,
    marginTop,
    marginRight,
    marginBottom,
    marginLeft,
    lineColors,
  } = chartSettings;

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
    .range([marginLeft, width - marginRight]);

  const yScale = d3
    .scaleLinear()
    .domain([0, yMax])
    .range([height - marginBottom, marginTop]);

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
      dataset: item.dataset,
    };
  });

  return (
    <GraphDiv>
      {hoverLineGraph ? (
        <Tooltip
          x={legendXPosition}
          y={legendYPosition}
          color={hoveredMetricColor}
          metric={hoveredMetric}
          time={hoveredTime}
          value={hoveredValue}
        />
      ) : null}
      <GraphSvg
        width={width + marginLeft + marginRight}
        height={height + marginBottom}
        onMouseMove={onMouseMove}
      >
        <g transform={`translate(${marginLeft}, 0)`}>
          <Axis
            scales={{ xScale, yScale }}
            margin={{ marginTop, marginRight, marginBottom, marginLeft }}
            svgDimensions={{ width, height }}
          />
          <AxisLabel
            x={-height / 2}
            y={marginRight - marginLeft}
            dy="1rem"
            transform="rotate(-90)"
            label="Values"
          />
          <AxisLabel
            x={width / 2 - marginLeft - marginRight}
            y={height + 5}
            label="Times"
          />
          <Lines
            metrics={metrics}
            transform={`translate(-${marginLeft}, 0)`}
            onHover={onHover}
          />
          {metrics.map(({ metric, dataset, color }) => (
            <g key={color} fill={color}>
              {dataset.map(({ time, value }) => (
                <circle
                  key={time}
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
          ))}
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
  onHover: PropTypes.func.isRequired,
  legendXPosition: PropTypes.number.isRequired,
  legendYPosition: PropTypes.number.isRequired,
  hoveredMetricColor: PropTypes.string.isRequired,
  hoverLineGraph: PropTypes.bool.isRequired,
  hoveredMetric: PropTypes.string.isRequired,
  hoveredTime: PropTypes.string.isRequired,
  hoveredValue: PropTypes.string.isRequired,
};

export default GraphContainer;
