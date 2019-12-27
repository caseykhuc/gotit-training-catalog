import React from 'react';
import { shallow } from 'enzyme';
import NotFoundPage from '../NotFoundPage';

describe('component/Common/NotFoundPage', () => {
  let props;
  let wrapper;

  const update = () => {
    wrapper.update();
  };
  const setup = () => {
    wrapper = shallow(<NotFoundPage {...props} />);
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
