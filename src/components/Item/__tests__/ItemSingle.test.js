import React from 'react';
import { shallow } from 'enzyme';
import { ItemSingle, mapStateToProps } from 'components/Item/ItemSingle';

describe('component/Item/ItemSingle', () => {
  let props;
  let wrapper;

  const update = () => {
    wrapper.update();
  };
  const setup = () => {
    wrapper = shallow(<ItemSingle {...props} />);
    update();
  };

  beforeEach(() => {
    props = {
      itemId: 0,
      categoryId: 1,
      history: {
        push: jest.fn(),
      },
      isLoadingItem: false,
      item: {
        name: 'test',
        description: 'test',
        price: 30,
        id: 1,
        userId: 0,
      },
      fetchItem: jest.fn().mockResolvedValue({
        success: true,
      }),
      userCurrent: 10,
    }
  });
  it('should render correctly', () => {
    setup();
    expect(wrapper).toMatchSnapshot();

    props.item.userId = 10;
    setup();
    expect(wrapper).toMatchSnapshot();

    props.item = undefined;
    setup();
    expect(wrapper).toMatchSnapshot();

    props.isLoadingItem = true;
    setup();
    expect(wrapper).toMatchSnapshot();
  });
  it('should fetchItem when item is not defined in props', () => {
    setup();
    expect(props.fetchItem).toHaveBeenCalled();
  });
  it('should redirect to category page when fail fetching items', async () => {
    props.fetchItem = () => Promise.resolve({ success: false });
    setup();
    await new Promise((resolve) => {
      setImmediate(resolve)
    });
    expect(props.history.push).toHaveBeenCalled();
  })
})

describe('component/Item/ItemSingle (mapStateToProps)', () => {
  let state;
  let match;
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
