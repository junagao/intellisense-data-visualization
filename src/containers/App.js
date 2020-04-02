import React from 'react';
import PropTypes from 'prop-types';
import { hot } from 'react-hot-loader/root';
import { connect } from 'react-redux';

import {
  getData,
  setHover,
  setLegendPosition,
  selectMetric,
  unselectMetric,
} from 'actions/data';
import { Table, GraphContainer } from 'components';
import AppContainer from 'containers/App.styles';

export class App extends React.Component {
  componentDidMount() {
    const { getData } = this.props;

    getData();
  }

  handleToggleMetric = (metric, dataset) => {
    const { selectMetric, unselectMetric, selectedMetrics } = this.props;

    return selectedMetrics.find((item) => item.metric === metric) === undefined
      ? selectMetric(metric, dataset)
      : unselectMetric(metric);
  };

  handleMouseMove = (e) => {
    const { setLegendPosition } = this.props;
    const graph = e.currentTarget.getBoundingClientRect();

    setLegendPosition(e.clientX - graph.left, e.clientY - graph.top);
  };

  render() {
    const {
      data,
      selectedMetrics,
      setHover,
      legendXPosition,
      legendYPosition,
      hoveredMetricColor,
      hoverLineGraph,
      hoveredMetric,
    } = this.props;
    return (
      <AppContainer>
        <Table
          data={data}
          onToggleMetric={this.handleToggleMetric}
          selectedMetrics={selectedMetrics}
        />
        <GraphContainer
          data={data}
          selectedMetrics={selectedMetrics}
          onMouseMove={this.handleMouseMove}
          onLineHover={setHover}
          legendXPosition={legendXPosition}
          legendYPosition={legendYPosition}
          hoveredMetricColor={hoveredMetricColor}
          hoverLineGraph={hoverLineGraph}
          hoveredMetric={hoveredMetric}
        />
      </AppContainer>
    );
  }
}

const mapStateToProps = (state) => ({
  data: state.data,
  selectedMetrics: state.selectedMetrics,
  legendXPosition: state.legendXPosition,
  legendYPosition: state.legendYPosition,
  hoveredMetricColor: state.hoveredMetricColor,
  hoverLineGraph: state.hoverLineGraph,
  hoveredMetric: state.hoveredMetric,
});

const mapDispatchToProps = {
  getData,
  setHover,
  setLegendPosition,
  selectMetric,
  unselectMetric,
};

App.propTypes = {
  getData: PropTypes.func.isRequired,
  data: PropTypes.arrayOf(PropTypes.shape({})).isRequired,
  selectedMetrics: PropTypes.arrayOf(PropTypes.shape({})).isRequired,
  setHover: PropTypes.func.isRequired,
  legendXPosition: PropTypes.number.isRequired,
  legendYPosition: PropTypes.number.isRequired,
  hoveredMetricColor: PropTypes.string.isRequired,
  hoverLineGraph: PropTypes.bool.isRequired,
  hoveredMetric: PropTypes.string.isRequired,
  setLegendPosition: PropTypes.func.isRequired,
  selectMetric: PropTypes.func.isRequired,
  unselectMetric: PropTypes.func.isRequired,
};

export const connectedApp = hot(
  connect(mapStateToProps, mapDispatchToProps)(App),
);
