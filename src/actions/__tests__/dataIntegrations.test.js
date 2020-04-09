import configureStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import moxios from 'moxios';
import api from 'api';
import { getData, getDataRequest } from '../data';
import { GET_DATA_REQUEST, GET_DATA_ERROR } from '../types';

const middlewares = [thunk];
const mockStore = configureStore(middlewares);

describe('data integration tests', () => {
  let store;

  const mockData = {
    data: {
      current: {
        data: {
          'pt2-scaled': {
            status: 200,
            response: {
              'metric-A': {
                time: [0, 5, 10, 15, 20],
                value: [0, 21, 34, 53, 120],
              },
              'metric-B': {
                time: [0, 5, 10, 15, 20],
                value: [32, 45, 49, 30, 39],
              },
            },
          },
        },
      },
    },
  };

  beforeEach(() => {
    store = mockStore();
    moxios.install(api);
  });

  afterEach(() => moxios.uninstall(api));

  it('should dispatch getDataRequest action correctly', (done) => {
    store.dispatch(getDataRequest());
    const calledActions = store.getActions();
    expect(calledActions[0].type).toEqual(GET_DATA_REQUEST);
    done();
  });

  it('it should fetch the data', async () => {
    moxios.wait(async () => {
      const request = moxios.requests.mostRecent();
      await request.respondWith({
        status: 200,
        response: mockData,
      });
    });
    const result = await api.get('/');
    expect(result.data).toEqual(mockData);
    // await store.dispatch(getData());
    // const calledActions = store.getActions();
    // console.log(calledActions);
  });

  it('should fail to get data', async (done) => {
    moxios.wait(async () => {
      const request = moxios.requests.mostRecent();
      await request.reject({
        status: 500,
      });
    });
    await store.dispatch(getData());
    const calledActions = store.getActions();
    expect(calledActions[1].type).toEqual(GET_DATA_ERROR);
    done();
  });
});
