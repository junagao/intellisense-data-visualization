import React from 'react';
import { mount } from 'enzyme';

import { App } from './App';

describe('App', () => {
  let wrapper;

  beforeEach(() => {
    const mockData = [
      {
        metric: 'metric A',
        dataset: [
          { time: 0, value: 10 },
          { time: 5, value: 39 },
          { time: 10, value: 50 },
          { time: 15, value: 130 },
        ],
      },
      {
        metric: 'metric B',
        dataset: [
          { time: 0, value: 0 },
          { time: 5, value: 24 },
          { time: 10, value: 43 },
          { time: 15, value: 390 },
        ],
      },
    ];

    wrapper = mount(
      <App
        data={mockData}
        getData={jest.fn()}
        selectedMetrics={[]}
        setHover={jest.fn()}
        error=""
        loading={false}
        legendXPosition={100}
        legendYPosition={200}
        hoveredMetricColor="#ff0"
        hoverLineGraph
        hoveredMetric="metric A"
        hoveredTime="20"
        hoveredValue="1341"
        setLegendPosition={jest.fn()}
        selectMetric={jest.fn()}
        unselectMetric={jest.fn()}
      />,
    );
  });

  afterEach(() => {
    wrapper.unmount();
  });

  it('should render correctly', () => {
    expect(wrapper).toMatchSnapshot();
  });

  it('shows one instance of Loading if is loading', () => {
    wrapper.setProps({ loading: true });
    expect(wrapper.find('Loading').length).toEqual(1);
  });

  it('shows one instance of Error if theres an error', () => {
    wrapper.setProps({ error: 'ERROR' });
    expect(wrapper.find('Error').length).toEqual(1);
  });

  it('shows one instance of Table and one of GraphContainer if theres not an error', () => {
    expect(wrapper.find('Table').length).toEqual(1);
    expect(wrapper.find('GraphContainer').length).toEqual(1);
  });
});
