import React from 'react';
import { shallow } from 'enzyme';
import { App, mapStateToProps } from '../App';

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

describe('component/App (mapStateToProps)', () => {
  let state;
  beforeEach(() => {
    state = {
      category: {
        byId: {},
        isLoading: false,
        error: 'Category Error',
      },
      user: {
        isLoading: true,
        error: 'User Error',
        userId: 1,
      },
    };
  });

  it('should return isLoading/error values properly', () => {
    expect(mapStateToProps(state).isLoading).toBe(true);
    expect(mapStateToProps(state).error).toBe('Category Error');

    state.user.isLoading = false;
    expect(mapStateToProps(state).isLoading).toBe(false);
  });
});
