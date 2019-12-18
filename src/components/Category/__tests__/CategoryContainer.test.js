
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
      fetchItems: jest.fn(),
      itemList: [],
      page: 0,
      history: { push: jest.fn() },
    }
  });
  it('should render correctly', () => {
    setup();
    expect(wrapper).toMatchSnapshot();
  });
  it('should render CategoryDetails and fetchItems when category props is defined', () => {
    setup();
    expect(categoryDetails.length).toEqual(1);
    expect(props.fetchItems).toHaveBeenCalledWith(props.categoryId);
  });
  it('should render danger Alert / not fetchItems / navigate when category props is undefined', () => {
    props.category = undefined;
    setup();
    expect(categoryDetails.length).toBe(0);
    expect(alertDanger.length).toBe(1);
    expect(props.fetchItems).not.toHaveBeenCalled();
    expect(props.history.push).toHaveBeenCalledWith('/');
  });
  it('should render ItemList when itemList.length > 0', () => {
    props.itemList = [{ name: 'item 1', description: 'desc' }];
    setup();
    expect(itemList.length).toBe(1);
  }); it('should render Alert when itemList is empty', () => {
    setup();
    expect(alertInfo.length).toBe(1);
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
