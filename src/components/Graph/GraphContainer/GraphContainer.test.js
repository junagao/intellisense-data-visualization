import React from 'react';
import { shallow } from 'enzyme';

import { Tooltip, Axis, AxisLabel, Lines } from 'components';
import GraphContainer from './GraphContainer';

describe('GraphContainer', () => {
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
  const mockSelectedMetrics = [];

  beforeEach(() => {
    wrapper = shallow(
      <GraphContainer
        data={mockData}
        selectedMetrics={mockSelectedMetrics}
        onMouseMove={jest.fn()}
        onHover={jest.fn()}
        legendXPosition={100}
        legendYPosition={200}
        hoveredMetricColor="#ff0"
        hoverLineGraph
        hoveredMetric="metric A"
        hoveredTime="20"
        hoveredValue="134"
      />,
    );
  });

  it('should render correctly given the required props', () => {
    expect(wrapper).toMatchSnapshot();
  });

  it('should render one GraphDiv element', () => {
    expect(wrapper.find('GraphDiv').length).toEqual(1);
  });

  it('should render one instance of Tooltip if hover on line graph', () => {
    expect(wrapper.find(Tooltip).length).toEqual(1);
  });

  it('should render null hoverLineGraph false', () => {
    wrapper.setProps({ hoverLineGraph: false });
    expect(wrapper.find(Tooltip).length).toEqual(0);
  });

  it('should render one GraphSvg element', () => {
    expect(wrapper.find('GraphSvg').length).toEqual(1);
  });

  it('should render one g elements', () => {
    expect(wrapper.find('g').length).toEqual(1);
  });

  it('should render one instance of Axis', () => {
    expect(wrapper.find(Axis).length).toEqual(1);
  });

  it('should render two instances of AxisLabel', () => {
    expect(wrapper.find(AxisLabel).length).toEqual(2);
  });

  it('should render one instance of Lines', () => {
    expect(wrapper.find(Lines).length).toEqual(1);
  });
});
