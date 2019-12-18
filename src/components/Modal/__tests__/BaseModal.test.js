import React from 'react';
import { shallow } from 'enzyme';
import { BaseModal } from '../BaseModal';

describe('components/BaseModal', () => {
  let props;
  let wrapper;
  const update = () => {
    wrapper.update();
  };
  const setup = () => {
    wrapper = shallow(<BaseModal {...props} />);
    update();
  };
  beforeEach(() => {
    props = {
      title: 'Title',
      hideModal: jest.fn(),
      children: null,
      onAccept: jest.fn(),
    }
  });
  it('should render correctly', () => {
    setup();
    expect(wrapper).toMatchSnapshot();
  })
})
