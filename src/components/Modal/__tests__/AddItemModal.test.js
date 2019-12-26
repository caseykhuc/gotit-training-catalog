import React from 'react';
import { shallow } from 'enzyme';
import { AddItemModal, validate } from '../AddItemModal';

describe('components/Modal/AddItemModal', () => {
  let props;
  let wrapper;

  const update = () => {
    wrapper.update();
  };
  const setup = () => {
    wrapper = shallow(<AddItemModal {...props} />);
    update();
  };
  beforeEach(() => {
    props = {
      addItem: jest.fn().mockResolvedValue({}),
      categories: [{ id: 2, name: 'Cat 1' }],
      onSuccess: jest.fn(),
    }
  });
  it('should render correctly', () => {
    setup();
    expect(wrapper).toMatchSnapshot();
  });
})

describe('components/Modal/AddItemModal (validate)', () => {
  let input;
  beforeEach(() => {
    input = {
      name: 'Name',
      price: '',
    }
  });
  it('should render error for undefined categoryId', () => {
    expect(validate(input).categoryId).toBeTruthy();
    input.categoryId = 'defined';
    expect(validate(input).categoryId).toBeFalsy();
  });
  it('should render error for name shorter then 5 characters', () => {
    expect(validate(input).name).toBeTruthy();
    input.name = 'Longer Name';
    expect(validate(input).name).toBeFalsy();
  });
  it('should render error for not numeric price', () => {
    expect(validate(input).price).toBeFalsy();
    input.price = 'abc';
    expect(validate(input).price).toBeTruthy();
  });
})
