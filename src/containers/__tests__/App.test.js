import React from 'react';
import { mount } from 'enzyme';

import { App } from 'containers/App';

describe('App', () => {
  let wrapper;

  beforeEach(() => {
    wrapper = mount(<App getData={jest.fn()} />);
  });

  afterEach(() => {
    wrapper.unmount();
  });

  it('should render correctly', () => {
    expect(wrapper).toMatchSnapshot();
  });
});
