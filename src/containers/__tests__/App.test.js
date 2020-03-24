import React from 'react';
import { mount } from 'enzyme';

import App from 'containers/App';

describe('App', () => {
  let wrapper;

  beforeEach(() => {
    wrapper = mount(<App />);
  });

  afterEach(() => {
    wrapper.unmount();
  });

  it('should render correctly', () => {
    expect(wrapper).toMatchSnapshot();
  });
});
