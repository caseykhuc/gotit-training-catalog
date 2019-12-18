import React from 'react';
import { shallow } from 'enzyme';
import CategoryDetails from '../CategoryDetails';

describe('component/Category/CategoryDetails', () => {
  let props;
  let wrapper;
  const update = () => {
    wrapper.update();
  };
  const setup = () => {
    wrapper = shallow(<CategoryDetails {...props} />);
    update();
  };
  beforeEach(() => {
    props = {
      category: {},
    }
  });
  it('should render correctly', () => {
    setup();
    expect(wrapper).toMatchSnapshot();
  })
})
