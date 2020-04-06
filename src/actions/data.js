import api from 'api';
import {
  GET_DATA_REQUEST,
  GET_DATA_SUCCESS,
  GET_DATA_ERROR,
  SET_HOVER,
  SET_LEGEND_POSITION,
  SELECT_METRIC,
  UNSELECT_METRIC,
} from 'actions/types';

export const getDataRequest = () => ({
  type: GET_DATA_REQUEST,
});

export const getDataSuccess = (data) => ({
  type: GET_DATA_SUCCESS,
  data,
});

export const getDataError = (error) => ({
  type: GET_DATA_ERROR,
  error,
});

export const getData = () => async (dispatch) => {
  dispatch(getDataRequest());

  try {
    const response = await api.get('/');
    const data = response.data.current.data['pt2-scaled'];
    if (data.status === 200) {
      const formatedData = Object.keys(data)
        .slice(1, 19)
        .map((k) => {
          const values = data[k].times.map((x, i) => ({
            time: x,
            value: data[k].values[i],
          }));
          return {
            metric: k,
            dataset: values,
          };
        });
      dispatch(getDataSuccess(formatedData));
    } else {
      dispatch(getDataError(data.message));
    }
  } catch (e) {
    dispatch(getDataError(e.message));
  }
};

export const setHover = (metric, color, time = '', value = '') => {
  let formatedTime = time;
  let formatedValue = value;

  switch (time) {
    case 0:
      formatedTime = '0';
      break;
    case '':
      formatedTime = '';
      break;
    default:
      formatedTime = time.toString();
  }

  switch (value) {
    case 0:
      formatedValue = '0';
      break;
    case '':
      formatedValue = '';
      break;
    case null:
      formatedValue = 'null';
      break;
    default:
      formatedValue = value.toFixed(2);
  }

  return {
    type: SET_HOVER,
    metric,
    color,
    time: formatedTime,
    value: formatedValue,
  };
};

export const setLegendPosition = (x, y) => ({
  type: SET_LEGEND_POSITION,
  x,
  y,
});

export const selectMetric = (metric, dataset) => ({
  type: SELECT_METRIC,
  metric,
  dataset,
});

export const unselectMetric = (metric) => ({
  type: UNSELECT_METRIC,
  metric,
});
