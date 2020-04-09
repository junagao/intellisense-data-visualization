import {
  getDataRequest,
  getDataSuccess,
  getDataError,
  setHover,
  setLegendPosition,
  selectMetric,
  unselectMetric,
} from '../data';
import {
  GET_DATA_REQUEST,
  GET_DATA_SUCCESS,
  GET_DATA_ERROR,
  SET_HOVER,
  SET_LEGEND_POSITION,
  SELECT_METRIC,
  UNSELECT_METRIC,
} from '../types';

describe('data actions', () => {
  describe('getDataRequest', () => {
    it('has the correct type', () => {
      const action = getDataRequest();

      expect(action.type).toEqual(GET_DATA_REQUEST);
    });

    it('had the correct payload', () => {
      const action = getDataRequest();

      expect(action.payload).toEqual();
    });
  });

  describe('getDataSuccess', () => {
    it('has the correct type', () => {
      const action = getDataSuccess();

      expect(action.type).toEqual(GET_DATA_SUCCESS);
    });

    it('had the correct payload', () => {
      const mockData = [
        {
          metric: 'pressure',
          dataset: [
            { time: 0, value: 132 },
            { time: 10, value: 300 },
          ],
        },
      ];
      const action = getDataSuccess(mockData);

      expect(action.data).toEqual(mockData);
    });
  });

  describe('getDataError', () => {
    it('has the correct type', () => {
      const action = getDataError();

      expect(action.type).toEqual(GET_DATA_ERROR);
    });

    it('had the correct payload', () => {
      const action = getDataError('An unexpected error ocurred!');

      expect(action.error).toEqual('An unexpected error ocurred!');
    });
  });

  describe('setHover', () => {
    it('has the correct type', () => {
      const action = setHover();

      expect(action.type).toEqual(SET_HOVER);
    });

    it('had the correct payload', () => {
      let action = setHover('metric 1', 'red');

      expect(action.metric).toEqual('metric 1');
      expect(action.color).toEqual('red');
      expect(action.time).toEqual('');
      expect(action.value).toEqual('');

      action = setHover('metric 2', 'red', 0, 0);
      expect(action.metric).toEqual('metric 2');
      expect(action.color).toEqual('red');
      expect(action.time).toEqual('0');
      expect(action.value).toEqual('0');

      action = setHover('metric 3', 'red', 10, null);
      expect(action.metric).toEqual('metric 3');
      expect(action.color).toEqual('red');
      expect(action.time).toEqual('10');
      expect(action.value).toEqual('null');
    });
  });

  describe('setLegendPosition', () => {
    it('has the correct type', () => {
      const action = setLegendPosition();

      expect(action.type).toEqual(SET_LEGEND_POSITION);
    });

    it('had the correct payload', () => {
      const action = setLegendPosition(20, 130);

      expect(action.x).toEqual(20);
      expect(action.y).toEqual(130);
    });
  });

  describe('selectMetric', () => {
    it('has the correct type', () => {
      const action = selectMetric();

      expect(action.type).toEqual(SELECT_METRIC);
    });

    it('had the correct payload', () => {
      const dataset = [
        { time: 0, value: 132 },
        { time: 10, value: 300 },
      ];
      const action = selectMetric('metricName', dataset);

      expect(action.metric).toEqual('metricName');
      expect(action.dataset).toEqual(dataset);
    });
  });

  describe('unselectMetric', () => {
    it('has the correct type', () => {
      const action = unselectMetric();

      expect(action.type).toEqual(UNSELECT_METRIC);
    });

    it('had the correct payload', () => {
      const action = unselectMetric('metricName');

      expect(action.metric).toEqual('metricName');
    });
  });
});
