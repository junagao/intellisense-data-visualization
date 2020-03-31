import React from 'react';
import PropTypes from 'prop-types';
import * as d3 from 'd3';

import {
  GraphContainer,
  GraphSvg,
  AxisG,
  LegendText,
  LinePath,
} from './LineGraph.styles';

const xAxisRef = React.createRef();
const yAxisRef = React.createRef();
const graphRef = React.createRef();

const LineGraph = ({
  data,
  onLineHover,
  hoverLineGraph,
  hoveredMetric,
  hoveredMetricColor,
  onLegendPosition,
  legendXPosition,
  legendYPosition,
  selectedMetrics,
}) => {
  if (!data && !selectedMetrics) return {};

  const width = 650;
  const height = 450;
  const margin = { top: 30, right: 5, bottom: 45, left: 80 };

  const dataToDraw = selectedMetrics.length ? selectedMetrics : data;

  const xMin = d3.min(dataToDraw, ({ dataset }) =>
    d3.min(dataset, ({ time }) => time),
  );

  const xMax = d3.max(dataToDraw, ({ dataset }) =>
    d3.max(dataset, ({ time }) => time),
  );

  const xScale = d3
    .scaleLinear()
    .domain([xMin, xMax])
    .range([margin.left, width - margin.right]);

  const yMax = d3.max(dataToDraw, ({ dataset }) =>
    d3.max(dataset, ({ value }) => value),
  );

  const yScale = d3
    .scaleLinear()
    .domain([0, yMax])
    .range([height - margin.bottom, margin.top]);

  const xAxis = d3
    .axisBottom(xScale)
    .tickSizeInner(-height + margin.top + margin.bottom)
    .tickPadding(10);

  const yAxis = d3
    .axisLeft(yScale)
    .tickSizeInner(-width + margin.left + margin.right)
    .tickPadding(10);

  d3.select(xAxisRef.current).call(xAxis);
  d3.select(yAxisRef.current).call(yAxis);

  const metricNames = dataToDraw.map(({ metric }) => metric);

  const color = d3
    .scaleOrdinal()
    .domain(metricNames)
    .range([
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
    ]);

  let metrics = dataToDraw.map((item) => {
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

  const handleMouseMove = (e) => {
    const graph = e.currentTarget.getBoundingClientRect();
    onLegendPosition(e.clientX - graph.left, e.clientY - graph.top);
  };

  const handleZoom = () => {
    const newXScale = d3.event.transform.rescaleX(xScale);
    const newYScale = d3.event.transform.rescaleY(yScale);

    d3.select(xAxisRef.current).call(
      d3
        .axisBottom(newXScale)
        .tickSizeInner(-height + margin.top + margin.bottom),
    );
    d3.select(yAxisRef.current).call(
      d3.axisLeft(newYScale).tickSizeInner(-width + margin.left + margin.right),
    );

    metrics = dataToDraw.map((item) => {
      const line = d3
        .line()
        .x((d) => newXScale(d.time))
        .y((d) => newYScale(d.value))
        .curve(d3.curveNatural)(item.dataset);
      return {
        metric: item.metric,
        path: line,
        color: color(item.metric),
      };
    });
  };

  const zoom = d3
    .zoom()
    .scaleExtent([0, 20])
    .extent([
      [0, 0],
      [width, height],
    ])
    .on('zoom', handleZoom);

  d3.select(graphRef.current).call(zoom);

  return (
    <GraphContainer>
      <GraphSvg
        width={width + margin.left + margin.right}
        height={height + margin.bottom}
        onMouseMove={handleMouseMove}
        ref={graphRef}
      >
        <g transform={`translate(${margin.left}, 0)`}>
          <AxisG
            ref={xAxisRef}
            transform={`translate(-${margin.left}, ${height - margin.bottom})`}
          />
          <AxisG ref={yAxisRef} />
          <text
            x={-height / 2}
            y={5 - margin.left}
            dy="1rem"
            transform="rotate(-90)"
          >
            Values
          </text>
          <text
            transform={`translate(${width / 2 - margin.left - margin.right}, ${
              height + 5
            })`}
          >
            Times
          </text>

          {metrics.map(({ metric, path, color }) => (
            <LinePath
              key={metric}
              d={path}
              stroke={color}
              transform={`translate(-${margin.left}, 0)`}
              onMouseOver={() => onLineHover(metric, color)}
              onFocus={() => onLineHover(metric, color)}
              onMouseOut={() => onLineHover(metric, color)}
              onBlur={() => onLineHover(metric, color)}
            />
          ))}
          <LegendText
            x={legendXPosition - 90}
            y={legendYPosition - 30}
            dy="0.25rem"
            fill={hoveredMetricColor}
            hover={hoverLineGraph}
          >
            {hoveredMetric}
          </LegendText>
        </g>
      </GraphSvg>
    </GraphContainer>
  );
};

LineGraph.propTypes = {
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
  onLineHover: PropTypes.func.isRequired,
  hoverLineGraph: PropTypes.bool.isRequired,
  hoveredMetric: PropTypes.string.isRequired,
  hoveredMetricColor: PropTypes.string.isRequired,
  onLegendPosition: PropTypes.func.isRequired,
  legendXPosition: PropTypes.number.isRequired,
  legendYPosition: PropTypes.number.isRequired,
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
};

export default LineGraph;
