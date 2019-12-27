
import React from 'react';
import { shallow } from 'enzyme';
import { Alert } from 'react-bootstrap'
import BaseForm from '../BaseForm'

describe('components/Common/BaseForm', () => {
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
    const options = [
      { name: 'Opt 1', id: 1 },
      { name: 'Opt 2', id: 2 }];

    props = {
      onInputChange: jest.fn(),
      onKeyDown: jest.fn(),
      fields: [
        { name: 'name', type: 'text' },
        { name: 'description', type: 'textarea' },
        { name: 'sample', type: 'textarea' },
        { name: 'categoryId', type: 'select', options }],
      inputError: {},
      inputValue: {
        name: '',
        description: '',
      },
      requestError: '',
    }
  });

  it('should render correctly', () => {
    setup();
    expect(wrapper).toMatchSnapshot();
  });

  it('should invoke onKeyDown when user press any key', () => {
    setup();
    container.props().onKeyDown({ key: 'b' });
    expect(props.onKeyDown).toHaveBeenCalled();
  });
  it('should render select input type', () => {
    setup();
    expect(wrapper.find('[as="select"]')).toHaveLength(1);
    expect(wrapper.find('option')).toHaveLength(props.fields.pop().options.length);
  });
  it('should render textarea input type', () => {
    setup();
    expect(wrapper.find('[as="textarea"]')).toHaveLength(2);
  });
  it('should render Alert when requestError exist', () => {
    props.requestError = 'Error';
    setup();
    expect(alert).toHaveLength(1);
  })
})
