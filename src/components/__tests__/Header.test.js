
import React from 'react';
import { shallow } from 'enzyme';
import { Header } from '../Header';

describe('component/Header', () => {
  let props;
  let wrapper;
  let authBtn;

  const update = () => {
    wrapper.update();
    authBtn = wrapper.find('.auth-btn');
  };
  const setup = () => {
    wrapper = shallow(<Header {...props} />);
    update();
  };
  beforeEach(() => {
    props = {
      isSignedIn: false,
      showModal: jest.fn(),
      signoutUser: jest.fn(),
    }
  });
  it('should render correctly', () => {
    setup();
    expect(wrapper).toMatchSnapshot();
  });
  it('should render SignIn button correctly', () => {
    setup();
    expect(authBtn.text()).toBe('Sign In');
    authBtn.simulate('click');
    expect(props.showModal).toHaveBeenCalledWith('SIGNIN_MODAL');
  });
  it('should render SignOut button correctly', () => {
    props.isSignedIn = true;
    setup();
    expect(authBtn.text()).toBe('Sign Out');
    authBtn.simulate('click');
    expect(props.signoutUser).toHaveBeenCalled();
  })
})
