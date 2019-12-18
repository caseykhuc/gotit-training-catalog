import React from 'react';
import { shallow } from 'enzyme';
import { SignInModal } from '../SignInModal';

describe('components/SignInModal', () => {
  let props;
  let wrapper;
  let container;
  const update = () => {
    wrapper.update();
    container = wrapper.find('div');
  };
  const setup = () => {
    wrapper = shallow(<SignInModal {...props} />);
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
  })
})
