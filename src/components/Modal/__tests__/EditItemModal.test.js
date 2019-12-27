import React from 'react';
import { shallow } from 'enzyme';
import { editItem } from 'actions/item';
import { EditItemModal, validate, mapDispatchToProps } from '../EditItemModal';

describe('components/Common/EditItemModal', () => {
  let props;
  let wrapper;

  const update = () => {
    wrapper.update();
  };
  const setup = () => {
    wrapper = shallow(<EditItemModal {...props} />);
    update();
  };
  beforeEach(() => {
    props = {
      editItem: jest.fn().mockResolvedValue({}),
      currentValue: {
        name: 'Sample',
        description: '',
        price: 100,
      },
    }
  });
  it('should render correctly', () => {
    setup();
    expect(wrapper).toMatchSnapshot();
  });
  it('should set default value for currentValue', () => {
    props.currentValue = undefined;
    setup();
    expect(wrapper.props().initialState.inputValue).toEqual({});
  })
})

describe('components/Modal/EditItemModal (validate)', () => {
  let input;
  beforeEach(() => {
    input = {
      name: 'Name',
      price: '',
    }
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

describe('components/Modal/EditItemModal (mapDispatchToProps)', () => {
  const dispatch = jest.fn();
  it('should return dispatched action', () => {
    const dispatched = mapDispatchToProps(dispatch,
      { categoryId: 1, itemId: 2 }).editItem;
    dispatched();
    expect(dispatch).toHaveBeenCalledWith(editItem(1, 2)())
  });
})
