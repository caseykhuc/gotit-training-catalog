
import React from 'react';
import { shallow } from 'enzyme';
import { Header } from '../Header';
import modalKeys from '../../constants/modelKeys';

describe('component/Header', () => {
  let props;
  let wrapper;
  let authBtn;
  let addBtn;
  let registerBtn;

  const update = () => {
    wrapper.update();
    authBtn = wrapper.find('.auth-btn');
    addBtn = wrapper.find('.add-btn');
    registerBtn = wrapper.find('.register-btn');
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
    expect(registerBtn).toHaveLength(1);
    registerBtn.simulate('click');
    expect(props.showModal).toHaveBeenCalledWith(modalKeys.REGISTER_MODAL);

    authBtn.simulate('click');
    expect(props.showModal).toHaveBeenCalledWith(modalKeys.SIGNIN_MODAL);
  });
  it('should render SignOut button correctly', () => {
    props.isSignedIn = true;
    setup();
    expect(authBtn.text()).toBe('Sign Out');
    expect(addBtn).toHaveLength(1);
    addBtn.simulate('click');
    expect(props.showModal).toHaveBeenCalledWith(modalKeys.ADD_ITEM_MODAL);

    authBtn.simulate('click');
    expect(props.signoutUser).toHaveBeenCalled();
  })
})
