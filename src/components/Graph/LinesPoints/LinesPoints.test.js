import React from 'react';
import { shallow } from 'enzyme';

import LinesPoints from './LinesPoints';

describe('LinesPoints', () => {
  let wrapper;

  const mockMetric = 'metric A';
  const mockDataset = [
    { time: 0, value: 23 },
    { time: 10, value: 53 },
  ];
  const mockColor = 'red';
  const mockMarginLeft = 30;
  const xScale = jest.fn();
  const yScale = jest.fn();
  const mockOnHover = jest.fn();

  beforeEach(() => {
    wrapper = shallow(
      <LinesPoints
        metric={mockMetric}
        dataset={mockDataset}
        marginLeft={mockMarginLeft}
        color={mockColor}
        scales={{ xScale, yScale }}
        onHover={mockOnHover}
      />,
    );
  });

  it('should render correctly given the required props', () => {
    expect(wrapper).toMatchSnapshot();
  });

  it('should render one g element', () => {
    expect(wrapper.find('g').length).toEqual(1);
  });

  it('should render two circle elements', () => {
    expect(wrapper.find('circle').length).toEqual(2);
  });
});
