import {
  GET_DATA_REQUEST,
  GET_DATA_SUCCESS,
  GET_DATA_ERROR,
  SET_HOVER,
  SET_LEGEND_POSITION,
  SELECT_METRIC,
  UNSELECT_METRIC,
} from 'actions/types';

const initialState = {
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

export default (state = initialState, action) => {
  switch (action.type) {
    case GET_DATA_REQUEST:
      return {
        ...state,
        loading: true,
        error: '',
      };
    case GET_DATA_SUCCESS: {
      return {
        ...state,
        data: action.data,
        loading: false,
      };
    }
    case GET_DATA_ERROR:
      return {
        ...state,
        loading: false,
        error: action.error,
      };
    case SET_HOVER:
      return {
        ...state,
        hoverLineGraph: !state.hoverLineGraph,
        hoveredMetric: action.metric,
        hoveredMetricColor: action.color,
        hoveredTime: action.time,
        hoveredValue: action.value,
      };
    case SET_LEGEND_POSITION:
      return {
        ...state,
        legendXPosition: action.x,
        legendYPosition: action.y,
      };
    case SELECT_METRIC:
      return {
        ...state,
        selectedMetrics: [
          ...state.selectedMetrics,
          {
            metric: action.metric,
            dataset: action.dataset,
          },
        ],
      };
    case UNSELECT_METRIC: {
      return {
        ...state,
        selectedMetrics: state.selectedMetrics.filter(
          ({ metric }) => metric !== action.metric,
        ),
      };
    }
    default:
      return state;
  }
};
