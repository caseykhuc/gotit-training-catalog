import React from 'react';
import { shallow } from 'enzyme';
import BaseModal from 'components/Base/BaseModal';
import { BaseFormModal } from 'components/Base/BaseFormModal';
import BaseForm from '../BaseForm'

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
      fields: [{ name: 'username', type: 'text' }, {
        name: 'password', type: 'password',
      }],
      initialState: {
        inputError: {},
        inputValue: {
          username: 'test',
          password: 'test',
        },
        requestError: 'error test',
      },
      title: 'Test Title',
      onAction: jest.fn().mockResolvedValue({ success: true }),
      hideModal: jest.fn(),
    }
  });
  it('should render correctly', () => {
    setup();
    expect(wrapper).toMatchSnapshot();
  });

  // onInputChange
  it('should controll inputs in BaseForm', () => {
    setup();
    baseForm.props().onInputChange({ target: { name: 'username', value: 'changed' } });
    expect(wrapper.state().inputValue.username).toEqual('changed');
  });
  it('should set input errors as validation if available', () => {
    props.validate = jest.fn().mockReturnValue({ username: 'Sample Validation' });
    setup();
    baseForm.props().onInputChange({ target: { name: 'username', value: 'changed' } });
    expect(wrapper.state().inputError).toEqual({ username: 'Sample Validation' });
  })

  // onKeyDown
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

  // onFormSubmit
  it('should invoke onAction when baseFormModal invoked onAccept ', () => {
    setup();
    baseModal.props().onAccept();
    expect(props.onAction).toHaveBeenCalled();
  });
  it('should not invoke onAction when all inputs are empty', () => {
    props.initialState.inputValue = {};
    setup();
    baseModal.props().onAccept();
    expect(props.onAction).not.toHaveBeenCalled();
    expect(wrapper.instance().state.requestError).toBe('Empty input');
  });
  it('should not invoke onAction when inputs are invalid', () => {
    props.validate = jest.fn().mockReturnValue({ username: 'Sample Error' });
    setup();
    baseModal.props().onAccept();
    expect(props.onAction).not.toHaveBeenCalled();
  });
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
  // onAction success
  it('should handle success response properly', async () => {
    props.onAction = () => Promise.resolve({ success: true });
    setup();
    await baseModal.props().onAccept();
    expect(wrapper.state()).toEqual(props.initialState);
    expect(props.hideModal).toHaveBeenCalled();
  });
  it('should invoke onSuccess if available', async () => {
    props.onSuccess = jest.fn();
    props.onAction = () => Promise.resolve({ success: true });
    setup();
    await baseModal.props().onAccept();
    expect(props.onSuccess).toHaveBeenCalled();
  })
})
