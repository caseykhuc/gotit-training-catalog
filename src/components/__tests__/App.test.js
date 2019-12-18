
import React from 'react';
import { shallow } from 'enzyme';
import { App } from '../App';

describe('component/Category/CategoryContainer', () => {
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
    }
  });
  it('should render correctly', () => {
    setup();
    expect(wrapper).toMatchSnapshot();
  });
  it('should fetch categories when mounted', () => {
    setup();
    expect(props.fetchCategory).toHaveBeenCalled();
  })
  /* it('should render CategoryDetails and fetchItems when category props is defined', () => {
    setup();
    expect(wrapper.find(CategoryDetails).length).toBe(1);
    expect(props.fetchItems).toHaveBeenCalledWith(props.categoryId);
  }); */
})
