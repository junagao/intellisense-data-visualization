import React from 'react';
import { shallow } from 'enzyme';

import AxisLabel from './AxisLabel';

describe('AxisLabel', () => {
  let wrapper;

  beforeEach(() => {
    wrapper = shallow(
      <AxisLabel
        x={100}
        y={299}
        dy="1rem"
        transform="rotate(-90)"
        label="Value"
      />,
    );
  });

  it('should render correctly given the required props', () => {
    expect(wrapper).toMatchSnapshot();
  });

  it('should render one AxisLabelText element with the correct `x, y, dy, transform` props and show the label', () => {
    expect(wrapper.find('AxisLabelText').length).toEqual(1);
    expect(wrapper.find('AxisLabelText').prop('x')).toEqual(100);
    expect(wrapper.find('AxisLabelText').prop('y')).toEqual(299);
    expect(wrapper.find('AxisLabelText').prop('dy')).toEqual('1rem');
    expect(wrapper.find('AxisLabelText').prop('transform')).toEqual(
      'rotate(-90)',
    );
    expect(wrapper.find('AxisLabelText').at(0).text()).toEqual('Value');
  });

  it('should render one AxisLabelText element with `x, y` props and `dy, transform` default props if they are null', () => {
    wrapper.setProps({ transform: null });
    wrapper.setProps({ dy: null });
    expect(wrapper.find('AxisLabelText').length).toEqual(1);
    expect(wrapper.find('AxisLabelText').prop('x')).toEqual(100);
    expect(wrapper.find('AxisLabelText').prop('y')).toEqual(299);
    expect(wrapper.find('AxisLabelText').prop('dy')).toBeNull();
    expect(wrapper.find('AxisLabelText').prop('transform')).toBeNull();
    expect(wrapper.find('AxisLabelText').at(0).text()).toEqual('Value');
  });
});
