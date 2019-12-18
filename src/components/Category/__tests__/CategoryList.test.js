
import React from 'react';
import { shallow } from 'enzyme';
import CategoryList from '../CategoryList';

describe('component/Category/CategoryList', () => {
  let props;
  let wrapper;
  const update = () => {
    wrapper.update();
  };
  const setup = () => {
    wrapper = shallow(<CategoryList {...props} />);
    update();
  };
  beforeEach(() => {
    props = {
      categories: [],
    }
  });
  it('should render correctly', () => {
    setup();
    expect(wrapper).toMatchSnapshot();
  })
})
