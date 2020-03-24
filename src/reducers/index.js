import {
  GET_DATA_REQUEST,
  GET_DATA_SUCCESS,
  GET_DATA_ERROR,
} from 'actions/types';

const initialState = {
  data: {},
  loading: false,
  error: '',
};

export default (state = initialState, action) => {
  switch (action.type) {
    case GET_DATA_REQUEST:
      return {
        ...state,
        loading: true,
        error: '',
      };
    case GET_DATA_SUCCESS:
      return {
        ...state,
        data: action.data,
        loading: false,
      };
    case GET_DATA_ERROR:
      return {
        ...state,
        loading: false,
        error: action.error,
      };
    default:
      return state;
  }
};
