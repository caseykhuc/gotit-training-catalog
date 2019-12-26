import React from 'react';
import { shallow } from 'enzyme';
import BaseModal from 'components/Base/BaseModal';
import { DeleteItemModal } from '../DeleteItemModal';

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
      deleteItem: jest.fn().mockResolvedValue({ success: true }),
      onSuccess: jest.fn(),
      hideModal: jest.fn(),
    }
  });
  it('should render correctly', () => {
    setup();
    expect(wrapper).toMatchSnapshot();
  });
  it('should invoke action when BaseModal invoked onAccept ', async () => {
    setup();
    await baseModal.props().onAccept();
    expect(props.deleteItem).toHaveBeenCalledWith(props.categoryId, props.itemId);
    expect(props.hideModal).toHaveBeenCalledTimes(1);

    props.deleteItem = jest.fn().mockResolvedValue({ success: false });
    setup();
    await baseModal.props().onAccept();
    expect(props.deleteItem).toHaveBeenCalledWith(props.categoryId, props.itemId);
    expect(props.hideModal).toHaveBeenCalledTimes(1);
  });
})
