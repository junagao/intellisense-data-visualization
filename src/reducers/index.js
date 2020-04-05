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
      const formatedData = Object.keys(action.data)
        .slice(1, 19)
        .map((k) => {
          const values = action.data[k].times.map((x, i) => ({
            time: x,
            value: action.data[k].values[i],
          }));
          return {
            metric: k,
            dataset: values,
          };
        });
      return {
        ...state,
        data: formatedData,
        loading: false,
      };
    }
    case GET_DATA_ERROR:
      return {
        ...state,
        loading: false,
        error: action.error,
      };
    case SET_HOVER: {
      let time;
      let value;

      switch (action.time) {
        case 0:
          time = '0';
          break;
        case '':
          time = '';
          break;
        default:
          time = action.time.toString();
      }

      switch (action.value) {
        case 0:
          value = '0';
          break;
        case '':
          value = '';
          break;
        case null:
          value = 'null';
          break;
        default:
          value = action.value.toFixed(2);
      }

      return {
        ...state,
        hoverLineGraph: !state.hoverLineGraph,
        hoveredMetric: action.metric,
        hoveredMetricColor: action.color,
        hoveredTime: time,
        hoveredValue: value,
      };
    }

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
