import React from 'react';
import { shallow } from 'enzyme';
import { RegisterModal } from '../RegisterModal';
import BaseModal from '../BaseModal';

describe('components/RegisterModal', () => {
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
  it('should invoke register when user press Enter', () => {
    setup();
    container.props().onKeyDown({ key: 'Enter' });
    expect(props.registerUser).toHaveBeenCalled();
  });
  it('should not invoke register when user press other key', () => {
    setup();
    container.props().onKeyDown({ key: 'a' });
    expect(props.registerUser).not.toHaveBeenCalled();
  });
  it('should call setState on input change', () => {
    setup();
    usernameField.simulate('change', { target: { name: 'username', value: 'test' } });
    expect(wrapper.state().username).toEqual('test')
  });
  it('should invoke register when baseModal invoked onAccept ', () => {
    setup();
    baseModal.props().onAccept();
    expect(props.registerUser).toHaveBeenCalled();
  })
})
