import React from 'react';
import { shallow } from 'enzyme';
import { ModalContainer } from '../ModalContainer';
import modalKeys from '../../constants/modelKeys';

describe('component/ModalContainer', () => {
  let props;
  let wrapper;
  let authBtn;

  const update = () => {
    wrapper.update();
  };
  const setup = () => {
    wrapper = shallow(<ModalContainer {...props} />);
    update();
  };
  beforeEach(() => {
    props = {
      modal: {
        current: 'SAMPLE_MODAL',
      },
    }
  });
  it('should render correctly', () => {
    setup();
    expect(wrapper).toMatchSnapshot();

    Object.keys(modalKeys).map((key) => {
      props.modal.current = modalKeys[key];
      setup();
      expect(wrapper).toMatchSnapshot();
    });
  });
})
