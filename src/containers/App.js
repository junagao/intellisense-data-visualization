import React from 'react';
import PropTypes from 'prop-types';
import { hot } from 'react-hot-loader/root';
import { connect } from 'react-redux';

import { getData, setHover, setLegendPosition } from 'actions/data';
import { Table, LineGraph } from 'components';
import AppContainer from 'containers/App.styles';

export class App extends React.Component {
  componentDidMount() {
    const { getData } = this.props;
    getData();
  }

  render() {
    const {
      data,
      setHover,
      hoverLineGraph,
      hoveredMetric,
      hoveredMetricColor,
      setLegendPosition,
      legendXPosition,
      legendYPosition,
      selectedMetrics,
    } = this.props;

    return (
      <AppContainer>
        <Table data={data} />
        <LineGraph
          data={data}
          onLineHover={setHover}
          hoverLineGraph={hoverLineGraph}
          hoveredMetric={hoveredMetric}
          hoveredMetricColor={hoveredMetricColor}
          onLegendPosition={setLegendPosition}
          legendXPosition={legendXPosition}
          legendYPosition={legendYPosition}
          selectedMetrics={selectedMetrics}
        />
      </AppContainer>
    );
  }
}

const mapStateToProps = (state) => ({
  data: state.data,
  hoverLineGraph: state.hoverLineGraph,
  hoveredMetric: state.hoveredMetric,
  hoveredMetricColor: state.hoveredMetricColor,
  legendXPosition: state.legendXPosition,
  legendYPosition: state.legendYPosition,
  selectedMetrics: state.selectedMetrics,
});

const mapDispatchToProps = {
  getData,
  setHover,
  setLegendPosition,
};

App.propTypes = {
  getData: PropTypes.func.isRequired,
  data: PropTypes.arrayOf(PropTypes.shape({})).isRequired,
  setHover: PropTypes.func.isRequired,
  hoverLineGraph: PropTypes.bool.isRequired,
  hoveredMetric: PropTypes.string.isRequired,
  hoveredMetricColor: PropTypes.string.isRequired,
  setLegendPosition: PropTypes.func.isRequired,
  legendXPosition: PropTypes.number.isRequired,
  legendYPosition: PropTypes.number.isRequired,
  selectedMetrics: PropTypes.arrayOf(PropTypes.shape({})).isRequired,
};

export const connectedApp = hot(
  connect(mapStateToProps, mapDispatchToProps)(App),
);
