import React from 'react';
import { shallow } from 'enzyme';
import BaseForm from '../BaseForm'
import BaseModal from '../BaseModal';
import BaseFormModal from '../BaseFormModal';

describe('components/BaseFormModal', () => {
  let props;
  let wrapper;
  let baseModal;
  let baseForm;

  const update = () => {
    wrapper.update();
    baseModal = wrapper.find(BaseModal);
    baseForm = wrapper.find(BaseForm);
  };
  const setup = () => {
    wrapper = shallow(<BaseFormModal {...props} />);
    update();
  };
  beforeEach(() => {
    props = {
      onAction: jest.fn(),
      initialState: {
        inputError: {},
        inputValue: {
          username: 'test',
          password: 'test',
        },
        requestError: 'error test',
      },
      fields: [{ name: 'username', type: 'text' }, {
        name: 'password', type: 'password',
      }],
      title: 'Test Title',
      /* validate: () => { }, */
    }
  });
  it('should render correctly', () => {
    setup();
    expect(wrapper).toMatchSnapshot();
  });
  it('should invoke onAction when user press Enter', () => {
    setup();
    baseForm.props().onKeyDown({ key: 'Enter' });
    expect(props.onAction).toHaveBeenCalled();
  });
  it('should not invoke onAction when user press other key', () => {
    setup();
    baseForm.props().onKeyDown({ key: 'b' });
    expect(props.onAction).not.toHaveBeenCalled();
  });
  it('should invoke onAction when baseFormModal invoked onAccept ', () => {
    setup();
    baseModal.props().onAccept();
    expect(props.onAction).toHaveBeenCalled();
  })
  it('should controll inputs in BaseForm', () => {
    setup();
    baseForm.props().onInputChange({ target: { name: 'username', value: 'changed' } });
    expect(wrapper.state().inputValue.username).toEqual('changed');
  })
  it('should set request error coresponding to failure message', async () => {
    props.onAction = () => Promise.resolve({ success: false, message: 'error test changed' });
    setup();
    await baseModal.props().onAccept();
    expect(wrapper.state().requestError).toEqual('error test changed')

    props.onAction = () => Promise.resolve({ success: false, message: { username: 'test changed' } });
    setup();
    await baseModal.props().onAccept();
    expect(wrapper.state().inputError).toEqual({ username: 'test changed' });
  })
  it('should reset state value when receive a success response', async () => {
    props.onAction = () => Promise.resolve({ success: true });
    setup();
    await baseModal.props().onAccept();
    expect(wrapper.state()).toEqual(props.initialState);
  })
})
