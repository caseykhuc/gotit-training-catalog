import React from 'react';
import { shallow } from 'enzyme';
import LoadingPage from '../LoadingPage';

describe('component/LoadingPage', () => {
  let props;
  let wrapper;

  const update = () => {
    wrapper.update();
  };
  const setup = () => {
    wrapper = shallow(<LoadingPage {...props} />);
    update();
  };
  beforeEach(() => {
    props = {
    }
  });
  it('should render correctly', () => {
    setup();
    expect(wrapper).toMatchSnapshot();
  });
})
