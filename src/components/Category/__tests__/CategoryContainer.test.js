
import React from 'react';
import { shallow } from 'enzyme';
import { CategoryContainer, mapStateToProps } from '../CategoryContainer';
import CategoryDetails from '../CategoryDetails';
import ItemList from '../../Item/ItemList';

describe('component/Category/CategoryContainer', () => {
  let props;
  let wrapper;
  let categoryDetails; let itemList; let alertDanger; let
    alertInfo;
  const update = () => {
    wrapper.update();
    categoryDetails = wrapper.find(CategoryDetails);
    itemList = wrapper.find(ItemList);
    alertDanger = wrapper.find('[variant="danger"]');
    alertInfo = wrapper.find('[variant="info"]');
  };
  const setup = () => {
    wrapper = shallow(<CategoryContainer {...props} />);
    update();
  };
  beforeEach(() => {
    props = {
      categoryId: 1,
      category: {
        name: 'name',
        description: 'description',
      },
      isLoadingItem: false,
      fetchItems: jest.fn(),
      itemList: [],
      page: 0,
      history: { push: jest.fn() },
    }
  });
  it('should render correctly', () => {
    setup();
    expect(wrapper).toMatchSnapshot();

    props.isLoadingItem = true;
    setup();
    expect(wrapper).toMatchSnapshot();

    props.itemList = [{}, {}];
    setup();
    expect(wrapper).toMatchSnapshot();
  });
  it('should render fetchItems when category props is defined', () => {
    setup();
    expect(props.fetchItems).toHaveBeenCalledWith(props.categoryId, props.page);
  });
  it('should render not fetchItems / navigate when category props is undefined', () => {
    props.category = undefined;
    setup();
    expect(props.fetchItems).not.toHaveBeenCalled();
    expect(props.history.push).toHaveBeenCalledWith('/');
  });
  it('should not fetch items when updating without categoryId || page change', () => {
    setup();
    wrapper.setProps({ categoryId: 1 });
    expect(props.fetchItems).toBeCalledTimes(1);
  });
  it('should fetch items again when updating without categoryId || page change', () => {
    setup();
    wrapper.setProps({ categoryId: 2 });
    expect(props.fetchItems).toBeCalledTimes(2);
  });
});

describe('component/Category/CategoryContainer (mapStateToProps)', () => {
  let state; let match; let
    location;
  beforeEach(() => {
    state = { category: { byId: { 1: 'Category' } }, item: {} };
    match = { params: { categoryId: '1' } };
    location = { search: '?page=2' };
  });

  it('should return the right categoryId and page from path', () => {
    expect(mapStateToProps(state, { match, location }).categoryId).toBe(1);
    expect(mapStateToProps(state, { match, location }).page).toBe(2);
  })
});
