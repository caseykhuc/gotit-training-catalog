import React from 'react';
import { shallow } from 'enzyme';
import { DeleteItemModal } from '../DeleteItemModal';
import BaseModal from '../../Base/BaseModal';

describe('components/Modal/DeleteItemModal', () => {
  let props;
  let wrapper;
  let baseModal;

  const update = () => {
    wrapper.update();
    baseModal = wrapper.find(BaseModal);
  };
  const setup = () => {
    wrapper = shallow(<DeleteItemModal {...props} />);
    update();
  };
  beforeEach(() => {
    props = {
      categoryId: 2,
      itemId: 1,
      deleteItemAndRefetch: jest.fn(),
    }
  });
  it('should render correctly', () => {
    setup();
    expect(wrapper).toMatchSnapshot();
  });
  it('should invoke action when BaseModal invoked onAccept ', () => {
    setup();
    baseModal.props().onAccept();
    expect(props.deleteItemAndRefetch).toHaveBeenCalledWith(props.categoryId, props.itemId);
  });
})
