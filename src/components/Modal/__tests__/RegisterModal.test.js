import React from 'react';
import { shallow } from 'enzyme';
import BaseFormModal from 'components/Base/BaseFormModal';
import { RegisterModal, validate } from '../RegisterModal';

describe('components/Modal/RegisterModal', () => {
  let props;
  let wrapper;
  let baseFormModal;

  const update = () => {
    wrapper.update();
    baseFormModal = wrapper.find(BaseFormModal);
  };
  const setup = () => {
    wrapper = shallow(<RegisterModal {...props} />);
    update();
  };
  beforeEach(() => {
    props = {
      registerUser: jest.fn(),
    }
  });
  it('should render correctly', () => {
    setup();
    expect(wrapper).toMatchSnapshot();
  });
  it('should invoke register when BaseFormModal invoked onAccept ', () => {
    setup();
    baseFormModal.props().onAction();
    expect(props.registerUser).toHaveBeenCalled();
  });
})

describe('components/Modal/RegisterModal (validate)', () => {
  let input;
  beforeEach(() => {
    input = {
      username: 'Name',
      email: 'abc',
      password: '1234',
      confirm: '123',
    }
  });
  it('should render error for username shorter then 5 characters', () => {
    expect(validate(input).username).toBeTruthy();
    input.username = 'Longer username';
    expect(validate(input).username).toBeFalsy();
  });
  it('should render error for invalid email', () => {
    expect(validate(input).email).toBeTruthy();
    input.email = 'a@gmail.com';
    expect(validate(input).email).toBeFalsy();
  });
  it('should render error for invalid password', () => {
    expect(validate(input).password).toBeTruthy();
    input.password = '1234abcd';
    expect(validate(input).password).toBeFalsy();
  });
  it('should render error for not matching confirm', () => {
    expect(validate(input).confirm).toBeTruthy();
    input.confirm = '1234';
    expect(validate(input).confirm).toBeFalsy();
  });
});
