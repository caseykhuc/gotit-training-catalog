import React from 'react';
import { shallow } from 'enzyme';
import { RegisterModal } from '../RegisterModal';
import BaseFormModal from '../../Base/BaseFormModal';

describe('components/RegisterModal', () => {
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
