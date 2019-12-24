import React from 'react';
import { shallow } from 'enzyme';
import { AddItemModal } from '../AddItemModal';
import BaseModal from '../../Base/BaseModal';

describe('components/Modal/AddItemModal', () => {
  let props;
  let wrapper;
  let baseModal;

  const update = () => {
    wrapper.update();
    baseModal = wrapper.find(BaseModal);
  };
  const setup = () => {
    wrapper = shallow(<AddItemModal {...props} />);
    update();
  };
  beforeEach(() => {
    props = {
      addItem: jest.fn().mockResolvedValue(),
      categories: [{}],
    }
  });
  it('should render correctly', () => {
    setup();
    expect(wrapper).toMatchSnapshot();
  });
})
