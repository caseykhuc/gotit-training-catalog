
import React from 'react';
import { shallow } from 'enzyme';
import { App } from '../App';

describe('component/App', () => {
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
      isLoading: false,
    }
  });
  it('should render correctly', () => {
    setup();
    expect(wrapper).toMatchSnapshot();

    props.categories = [];
    setup();
    expect(wrapper).toMatchSnapshot();

    props.isLoading = true;
    setup();
    expect(wrapper).toMatchSnapshot();
  });
  it('should fetch  user when mounted', () => {
    setup();
    expect(props.fetchUser).toHaveBeenCalled();
  })
})
