import React from 'react';
import { shallow } from 'enzyme';

import { LinesPoints } from 'components';
import Lines from './Lines';

describe('Lines', () => {
  let wrapper;

  const mockMetrics = [
    {
      metric: 'metric A',
      path: 'M34 3535',
      color: 'red',
      dataset: [
        { time: 0, value: 23 },
        { time: 10, value: 53 },
      ],
    },
  ];
  const mockMarginLeft = 30;
  const mockTransform = `translate(-${mockMarginLeft}, 0)`;
  const mockXScale = jest.fn();
  const mockYScale = jest.fn();
  const mockOnHover = jest.fn();

  beforeEach(() => {
    wrapper = shallow(
      <Lines
        metrics={mockMetrics}
        onHover={mockOnHover}
        transform={mockTransform}
        scales={{ mockXScale, mockYScale }}
        marginLeft={mockMarginLeft}
      />,
    );
  });

  it('should render correctly given the required props', () => {
    expect(wrapper).toMatchSnapshot();
  });

  it('should render one Fragment element', () => {
    expect(wrapper.find('Fragment').length).toEqual(1);
  });

  it('should render one LinePath element with prop `d, stroke, transform, onMouseOver, onFocus, onMouseOut, onBlur`', () => {
    expect(wrapper.find('LinePath').length).toEqual(1);
    expect(wrapper.find('LinePath').prop('d')).toEqual(mockMetrics[0].path);
    expect(wrapper.find('LinePath').prop('stroke')).toEqual(
      mockMetrics[0].color,
    );
    expect(wrapper.find('LinePath').prop('transform')).toEqual(mockTransform);
  });

  it('should render one instance of LinesPoints passing the props `metric, dataset, marginLeft, color, scales, onHover`', () => {
    expect(wrapper.find(LinesPoints).length).toEqual(1);
    expect(wrapper.find(LinesPoints).prop('metric')).toEqual('metric A');
    expect(wrapper.find(LinesPoints).prop('dataset')).toEqual(
      mockMetrics[0].dataset,
    );
    expect(wrapper.find(LinesPoints).prop('marginLeft')).toEqual(
      mockMarginLeft,
    );
    expect(wrapper.find(LinesPoints).prop('color')).toEqual(
      mockMetrics[0].color,
    );
    expect(wrapper.find(LinesPoints).prop('scales')).toEqual({
      mockXScale,
      mockYScale,
    });
    expect(wrapper.find(LinesPoints).prop('onHover')).toEqual(mockOnHover);
  });
});
