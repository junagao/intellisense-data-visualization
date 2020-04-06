import React from 'react';
import { shallow } from 'enzyme';

import Loading from './Loading';

describe('Loading', () => {
  let wrapper;

  beforeEach(() => {
    wrapper = shallow(<Loading />);
  });

  it('should render correctly given the required props', () => {
    expect(wrapper).toMatchSnapshot();
  });

  it('should render one SpinnerDiv element', () => {
    expect(wrapper.find('SpinnerDiv').length).toEqual(1);
  });

  it('should render two SpinnerDoubleBounceDiv elements', () => {
    expect(wrapper.find('SpinnerDoubleBounceDiv').length).toEqual(2);
  });
});
