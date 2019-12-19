
import React from 'react';
import { shallow } from 'enzyme';
import { Alert } from 'react-bootstrap'
import BaseForm from '../BaseForm'

describe('components/BaseForm', () => {
  let props;
  let wrapper;
  let container;
  let alert;
  const update = () => {
    wrapper.update();
    container = wrapper.find('div');
    alert = wrapper.find(Alert);
  };
  const setup = () => {
    wrapper = shallow(<BaseForm {...props} />);
    update();
  };
  beforeEach(() => {
    props = {
      inputValue: {
        username: '',
        password: '',
      },
      inputError: {
      },
      requestError: '',
      fields: [{ name: 'username', type: 'text' }, {
        name: 'password', type: 'password',
      }],
      onAction: jest.fn(),
      onKeyDown: jest.fn(),
      onInputChange: jest.fn(),
    }
  });
  it('should render correctly', () => {
    setup();
    expect(wrapper).toMatchSnapshot();
  });
  it('should invoke onAction when user press any key', () => {
    setup();
    container.props().onKeyDown({ key: 'b' });
    expect(props.onKeyDown).toHaveBeenCalled();
  });
  it('should render Alert when requestError exist', () => {
    props.requestError = 'Error';
    setup();
    expect(alert).toHaveLength(1);
  })
})
