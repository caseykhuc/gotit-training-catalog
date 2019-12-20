
import React from 'react';
import { shallow } from 'enzyme';
import { App } from '../App';

describe('component/Category/App', () => {
  let props;
  let wrapper;
  const update = () => {
    wrapper.update();
  };
  const setup = () => {
    wrapper = shallow(<App {...props} />);
    update();
  };
  beforeEach(() => {
    props = {
      categories: [{
        id: 1,
        name: 'Cat',
      }],
      fetchCategory: jest.fn(),
      fetchUser: jest.fn(),
    }
  });
  it('should render correctly', () => {
    setup();
    expect(wrapper).toMatchSnapshot();
    props.categories = [];
    setup();
    expect(wrapper).toMatchSnapshot();
  });
  it('should fetch categories & user when mounted', () => {
    setup();
    expect(props.fetchCategory).toHaveBeenCalled();
    expect(props.fetchUser).toHaveBeenCalled();
  })
  /* it('should render CategoryDetails and fetchItems when category props is defined', () => {
    setup();
    expect(wrapper.find(CategoryDetails).length).toBe(1);
    expect(props.fetchItems).toHaveBeenCalledWith(props.categoryId);
  }); */
})
