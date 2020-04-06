import {
  GET_DATA_REQUEST,
  GET_DATA_SUCCESS,
  GET_DATA_ERROR,
  SET_HOVER,
  SET_LEGEND_POSITION,
  SELECT_METRIC,
  UNSELECT_METRIC,
} from 'actions/types';
import reducer from './index';

describe('reducer', () => {
  let initialState = {
    data: [],
    loading: false,
    error: '',
    hoverLineGraph: false,
    hoveredMetric: '',
    hoveredMetricColor: '',
    hoveredTime: '',
    hoveredValue: '',
    legendXPosition: 0,
    legendYPosition: 0,
    selectedMetrics: [],
  };

  const mockMetric = {
    metric: 'metric A',
    dataset: [
      { time: 0, value: 10 },
      { time: 10, value: 200 },
    ],
  };

  it('should return the initial state', () => {
    expect(reducer(undefined, {})).toEqual(initialState);
  });

  it('should handle GET_DATA_REQUEST', () => {
    const action = {
      type: GET_DATA_REQUEST,
    };

    const expectedState = {
      ...initialState,
      loading: true,
      error: '',
    };

    expect(reducer(initialState, action)).toEqual(expectedState);
  });

  it('should handle GET_DATA_SUCCESS', () => {
    const data = [mockMetric];

    const action = {
      type: GET_DATA_SUCCESS,
      data,
    };

    const expectedState = {
      ...initialState,
      data,
      loading: false,
    };

    expect(reducer(initialState, action)).toEqual(expectedState);
  });

  it('should handle GET_DATA_ERROR', () => {
    const action = {
      type: GET_DATA_ERROR,
      error: 'Error Fetching Data!',
    };

    const expectedState = {
      ...initialState,
      loading: false,
      error: 'Error Fetching Data!',
    };

    expect(reducer(initialState, action)).toEqual(expectedState);
  });

  it('should handle SET_HOVER', () => {
    const action = {
      type: SET_HOVER,
      metric: 'metric 1',
      color: '#ff0',
      time: '15',
      value: '1343',
    };

    const expectedState = {
      ...initialState,
      hoverLineGraph: !initialState.hoverLineGraph,
      hoveredMetric: 'metric 1',
      hoveredMetricColor: '#ff0',
      hoveredTime: '15',
      hoveredValue: '1343',
    };

    expect(reducer(initialState, action)).toEqual(expectedState);
  });

  it('should handle SET_LEGEND_POSITION', () => {
    const x = 100;
    const y = 234;

    const action = {
      type: SET_LEGEND_POSITION,
      x,
      y,
    };

    const expectedState = {
      ...initialState,
      legendXPosition: x,
      legendYPosition: y,
    };

    expect(reducer(initialState, action)).toEqual(expectedState);
  });

  it('should handle SELECT_METRIC', () => {
    const action = {
      type: SELECT_METRIC,
      metric: mockMetric.metric,
      dataset: mockMetric.dataset,
    };

    const expectedState = {
      ...initialState,
      selectedMetrics: [
        ...initialState.selectedMetrics,
        {
          metric: mockMetric.metric,
          dataset: mockMetric.dataset,
        },
      ],
    };

    expect(reducer(initialState, action)).toEqual(expectedState);
  });

  it('should handle UNSELECT_METRIC', () => {
    const action = {
      type: UNSELECT_METRIC,
      metric: mockMetric.metric,
    };

    initialState = {
      ...initialState,
      selectedMetrics: [mockMetric],
    };

    const expectedState = {
      ...initialState,
      selectedMetrics: initialState.selectedMetrics.filter(
        ({ metric }) => metric !== mockMetric.metric,
      ),
    };

    expect(reducer(initialState, action)).toEqual(expectedState);
  });
});
