import React from 'react';
import { shallow } from 'enzyme';
import { CategoryList } from '../CategoryList';

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
      categories: [
        { name: 'Name', id: 1 },
        { name: 'Name 2', id: 2 },
      ],
      match: { params: { categoryId: '1' } },
      history: { push: jest.fn() },
    }
  });
  it('should render correctly', () => {
    setup();
    expect(wrapper).toMatchSnapshot();
  });
  it('should direct to other category when selected', () => {
    setup();
    wrapper.instance().onSelect(2);
    expect(props.history.push).toHaveBeenCalledWith('/categories/2');
  })
})
