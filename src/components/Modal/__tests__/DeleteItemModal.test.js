import React from 'react';
import { shallow } from 'enzyme';
import { DeleteItemModal } from '../DeleteItemModal';

describe('components/Modal/DeleteItemModal', () => {
  let props;
  let wrapper;

  const update = () => {
    wrapper.update();
  };
  const setup = () => {
    wrapper = shallow(<DeleteItemModal {...props} />);
    update();
  };
  beforeEach(() => {
    props = {
      /* signinUser: jest.fn(), */
    }
  });
  it('should render correctly', () => {
    setup();
    expect(wrapper).toMatchSnapshot();
  });
  /*   it('should invoke register when BaseFormModal invoked onAccept ', () => {
      setup();
      baseFormModal.props().onAction();
      expect(props.signinUser).toHaveBeenCalled();
    }); */
})
