import api from 'api';
import {
  GET_DATA_REQUEST,
  GET_DATA_SUCCESS,
  GET_DATA_ERROR,
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

const getData = () => async (dispatch) => {
  dispatch(getDataRequest());
  try {
    const response = await api.get('/');
    dispatch(getDataSuccess(response.data.current.data['pt2-scaled']));
  } catch (e) {
    dispatch(getDataError(e.message));
  }
};

export default getData;
