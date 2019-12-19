import React from 'react';
import { shallow } from 'enzyme';
import { SignInModal } from '../SignInModal';
import BaseModal from '../../Base/BaseModal';

describe('components/SignInModal', () => {
  let props;
  let wrapper;
  let container;
  let usernameField;
  let baseModal;

  const update = () => {
    wrapper.update();
    container = wrapper.find('div');
    usernameField = wrapper.find('[name="username"]');
    baseModal = wrapper.find(BaseModal);
  };
  const setup = () => {
    wrapper = shallow(<SignInModal {...props} />);
    update();
  };
  beforeEach(() => {
    props = {
      signinUser: jest.fn(),
    }
  });
  it('should render correctly', () => {
    setup();
    expect(wrapper).toMatchSnapshot();
  });
  it('should invoke SIGNIN_USER when user press Enter', () => {
    setup();
    container.props().onKeyDown({ key: 'Enter' });
    expect(props.signinUser).toHaveBeenCalled();
  });
  it('should invoke SIGNIN_USER when user press other key', () => {
    setup();
    container.props().onKeyDown({ key: 'b' });
    expect(props.signinUser).not.toHaveBeenCalled();
  });
  it('should call setState on input change', () => {
    setup();
    usernameField.simulate('change', { target: { name: 'username', value: 'test' } });
    expect(wrapper.state().username).toEqual('test')
  });
  it('should invoke register when baseModal invoked onAccept ', () => {
    setup();
    baseModal.props().onAccept();
    expect(props.signinUser).toHaveBeenCalled();
  })
})
