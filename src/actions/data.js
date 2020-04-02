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

const getDataRequest = () => ({
  type: GET_DATA_REQUEST,
});

const getDataSuccess = (data) => ({
  type: GET_DATA_SUCCESS,
  data,
});

const getDataError = (error) => ({
  type: GET_DATA_ERROR,
  error,
});

export const getData = () => async (dispatch) => {
  dispatch(getDataRequest());
  try {
    const response = await api.get('/');
    dispatch(getDataSuccess(response.data.current.data['pt2-scaled']));
  } catch (e) {
    dispatch(getDataError(e.message));
  }
};

export const setHover = (metric, color, time = '', value = '') => ({
  type: SET_HOVER,
  metric,
  color,
  time,
  value,
});

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
