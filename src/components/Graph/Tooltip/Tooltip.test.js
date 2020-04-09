import React from 'react';
import { shallow } from 'enzyme';

import Tooltip from './Tooltip';

describe('Tooltip', () => {
  let wrapper;

  beforeEach(() => {
    wrapper = shallow(
      <Tooltip
        x={12}
        y={23}
        color="red"
        metric="metric A"
        time="20"
        value="2342"
      />,
    );
  });

  it('should render correctly given the required props', () => {
    expect(wrapper).toMatchSnapshot();
  });

  it('should render one TooltipDiv element', () => {
    expect(wrapper.find('TooltipDiv').length).toEqual(1);
  });

  it('should render one TooltipH1 element with the metric name and pass the `color` prop', () => {
    expect(wrapper.find('TooltipH1').length).toEqual(1);
    expect(wrapper.find('TooltipH1').prop('color')).toEqual('red');
    expect(wrapper.find('TooltipH1').at(0).text()).toEqual('metric A');
  });

  it('should render one TooltipP element with one TooltipSpan element with the time and another TooltipP element with a TooltipSpan with the value  ', () => {
    expect(wrapper.find('TooltipP').length).toEqual(2);
    expect(wrapper.find('TooltipSpan').length).toEqual(2);
    expect(wrapper.find('TooltipSpan').at(0).text()).toEqual('time:');
    expect(wrapper.find('TooltipP').at(0).childAt(2).text()).toEqual('20');
    expect(wrapper.find('TooltipSpan').at(1).text()).toEqual('value:');
    expect(wrapper.find('TooltipP').at(1).childAt(2).text()).toEqual('2342');
  });

  it('should render only the TooltipH1 element if time and value is an empty string - showing the metric and TooltipDiv having only the `x, y` props', () => {
    wrapper.setProps({ time: '', value: '' });
    expect(wrapper.find('TooltipDiv').prop('x')).toEqual(12);
    expect(wrapper.find('TooltipDiv').prop('y')).toEqual(23);
    expect(wrapper.find('TooltipH1').length).toEqual(1);
    expect(wrapper.find('TooltipH1').prop('color')).toEqual('red');
    expect(wrapper.find('TooltipH1').at(0).text()).toEqual('metric A');
    expect(wrapper.find('TooltipP').length).toEqual(0);
  });
});
