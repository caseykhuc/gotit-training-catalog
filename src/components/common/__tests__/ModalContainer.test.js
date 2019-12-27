import React from 'react';
import { shallow } from 'enzyme';
import modalKeys from 'constants/modelKeys';
import { ModalContainer } from '../ModalContainer';

describe('component/Common/ModalContainer', () => {
  let props;
  let wrapper;

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
      return expect(wrapper).toMatchSnapshot();
    });
  });
})
