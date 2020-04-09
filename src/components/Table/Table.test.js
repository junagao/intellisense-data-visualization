import React from 'react';
import { shallow } from 'enzyme';

import Table from './Table';

describe('Table', () => {
  let wrapper;
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
  const mockOnToggleMetric = jest.fn();
  const mockSelectedMetrics = [];

  beforeEach(() => {
    wrapper = shallow(
      <Table
        data={mockData}
        onToggleMetric={mockOnToggleMetric}
        selectedMetrics={mockSelectedMetrics}
      />,
    );
  });

  it('should render correctly given the required props', () => {
    expect(wrapper).toMatchSnapshot();
  });

  it('should render one TableContainer element', () => {
    expect(wrapper.find('TableContainer').length).toEqual(1);
  });

  it('should render one TableTable element', () => {
    expect(wrapper.find('TableTable').length).toEqual(1);
  });

  it('should render one colgroup element with one MetricColumn and one ValueColumn element', () => {
    expect(wrapper.find('colgroup').length).toEqual(1);
    expect(wrapper.find('MetricColumn').length).toEqual(1);
    expect(wrapper.find('ValueColumn').length).toEqual(1);
  });

  it('should render one TableThead element', () => {
    expect(wrapper.find('TableThead').length).toEqual(1);
  });

  it('should render no TableTh if theres no data', () => {
    wrapper.setProps({ data: [] });
    expect(wrapper.find('TableTh').length).toEqual(0);
  });

  it('should render three TableTr element', () => {
    expect(wrapper.find('TableTr').length).toEqual(3);
  });

  it('should render two TableTh element', () => {
    expect(wrapper.find('TableTh').length).toEqual(2);
  });

  it('should render one tbody element', () => {
    expect(wrapper.find('tbody').length).toEqual(1);
  });

  it('should test click event one metric and pass `metric and dataset` to onToggleMetric()', () => {
    wrapper.find('TableTr').at(1).simulate('click');
    expect(mockOnToggleMetric.mock.calls[0][0]).toEqual(mockData[0].metric);
    expect(mockOnToggleMetric.mock.calls[0][1]).toEqual(mockData[0].dataset);
    expect(mockOnToggleMetric.mock.calls.length).toEqual(1);
  });

  it('should render four TableTd element', () => {
    expect(wrapper.find('TableTd').length).toEqual(4);
  });
});
