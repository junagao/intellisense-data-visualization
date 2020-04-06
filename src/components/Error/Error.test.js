import React from 'react';
import { shallow } from 'enzyme';

import Error from './Error';

describe('ErrorMessage', () => {
  let wrapper;
  const error = 'ERROR';

  beforeEach(() => {
    wrapper = shallow(<Error error={error} />);
  });

  it('should render correctly given the required props', () => {
    expect(wrapper).toMatchSnapshot();
  });

  it('should render one ErrorDiv element', () => {
    expect(wrapper.find('ErrorDiv').length).toEqual(1);
  });

  it('should render two p elements', () => {
    expect(wrapper.find('p').length).toEqual(2);
  });

  it('should render the error message correctly', () => {
    expect(wrapper.find('p').at(0).length).toEqual(1);
    expect(wrapper.find('p').at(0).text()).toEqual(
      `The following unexpected error occurred: ${error}.`,
    );
    expect(wrapper.find('p').at(1).length).toEqual(1);
    expect(wrapper.find('p').at(1).text()).toEqual(`Please try again.`);
  });
});
