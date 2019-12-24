import React from 'react';
import { shallow } from 'enzyme';
import { SignInModal } from '../SignInModal';
import BaseFormModal from '../../Base/BaseFormModal';

describe('components/Modal/SignInModal', () => {
  let props;
  let wrapper;
  let baseFormModal;

  const update = () => {
    wrapper.update();
    baseFormModal = wrapper.find(BaseFormModal);
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
  it('should invoke register when BaseFormModal invoked onAccept ', () => {
    setup();
    baseFormModal.props().onAction();
    expect(props.signinUser).toHaveBeenCalled();
  });
})
