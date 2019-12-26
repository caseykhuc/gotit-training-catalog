import React from 'react';
import { shallow } from 'enzyme';
import modalKeys from 'constants/modelKeys';
import { Header } from '../Header';

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
      history: {
        push: jest.fn(),
      },
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
    expect(props.showModal).toHaveBeenCalled();

    authBtn.simulate('click');
    expect(props.signoutUser).toHaveBeenCalled();
  });
  it('should invoke onAddSuccess as on addBtn', () => {
    props.isSignedIn = true;
    setup();
    addBtn.simulate('click');
    // retrieve onAddSuccess func
    const onAddSuccess = props.showModal.mock.calls.pop()[1].onSuccess;
    onAddSuccess({ categoryId: 1 }, { id: 2 });
    expect(props.history.push).toHaveBeenCalledWith('/categories/items/1/2')
  });
})
