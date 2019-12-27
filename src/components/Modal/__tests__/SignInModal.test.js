import React from 'react';
import { shallow } from 'enzyme';
import BaseFormModal from 'components/Common/BaseFormModal';
import { SignInModal } from '../SignInModal';

describe('components/Common/SignInModal', () => {
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
      signInUser: jest.fn(),
    }
  });
  it('should render correctly', () => {
    setup();
    expect(wrapper).toMatchSnapshot();
  });
  it('should invoke register when BaseFormModal invoked onAccept ', () => {
    setup();
    baseFormModal.props().onAction();
    expect(props.signInUser).toHaveBeenCalled();
  });
})
