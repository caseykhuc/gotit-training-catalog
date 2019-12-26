import React from 'react';
import { shallow } from 'enzyme';
import BaseFormModal from 'components/Base/BaseFormModal';
import { SignInModal } from '../SignInModal';

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
