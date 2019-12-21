import React from 'react';
import { shallow } from 'enzyme';
import ModifyButton from '../ModifyButton';
import { ItemSingle, mapStateToProps } from '../ItemSingle';

describe('component/Item/ItemSingle', () => {
  let props;
  let wrapper;
  let modifyButton;

  const update = () => {
    wrapper.update();
    modifyButton = wrapper.find(ModifyButton);
  };
  const setup = () => {
    wrapper = shallow(<ItemSingle {...props} />);
    update();
  };

  beforeEach(() => {
    props = {
      itemId: 0,
      item: {
        name: 'test',
        description: 'test',
        id: 1,
        user_id: 0,
      },
      categoryId: 1,
      userCurrent: 10,
      fetchItem: jest.fn(),
      showModal: jest.fn(),
    }
  });
  it('should render correctly', () => {
    setup();
    expect(wrapper).toMatchSnapshot();
  });
  it('should render modifyButton when userId match', () => {
    props.item.user_id = 10;
    setup();
    expect(modifyButton.length).toBeTruthy();
  });
  it('should fetchItem when item is not defined in props', () => {
    props.item = undefined;
    setup();
    expect(props.fetchItem).toHaveBeenCalled();
  })
})

describe('component/Item/ItemSingle (mapStateToProps)', () => {
  let state; let match; let
    location;
  beforeEach(() => {
    state = { user: { userId: 10 }, item: { byId: [] } };
    match = { params: { categoryId: 1, itemId: 2 } };
  });

  it('should return the right categoryId/itemId from path', () => {
    expect(mapStateToProps(state, { match }).categoryId).toBe(1);
    expect(mapStateToProps(state, { match }).itemId).toBe(2);
  });
  it('should return userId/item correctly from state', () => {
    expect(mapStateToProps(state, { match }).userCurrent).toBe(10);
    expect(mapStateToProps(state, { match }).item).toBeFalsy();
  })
});
