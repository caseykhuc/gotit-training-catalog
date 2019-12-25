
import React from 'react';
import { shallow } from 'enzyme';
import { CategoryContainer, mapStateToProps } from '../CategoryContainer';

describe('component/Category/CategoryContainer', () => {
  let props;
  let wrapper;

  const update = () => {
    wrapper.update();
  };
  const setup = () => {
    wrapper = shallow(<CategoryContainer {...props} />);
    update();
  };
  beforeEach(() => {
    props = {
      categoryId: 1,
      fetchItems: jest.fn(),
      page: 0,
      totalPages: 5,
      history: { push: jest.fn() },
      isLoadingItem: false,
      userCurrent: 10,
      category: {
        name: 'name',
        description: 'description',
      },
      itemList: [{
        id: 0,
        name: 'test',
        userId: 3,
      }],
    }
  });
  it('should render correctly', () => {
    setup();
    expect(wrapper).toMatchSnapshot();

    props.isLoadingItem = true;
    setup();
    expect(wrapper).toMatchSnapshot();

    props.userCurrent = 3;
    setup();
    expect(wrapper).toMatchSnapshot();

    props.itemList = [];
    setup();
    expect(wrapper).toMatchSnapshot();

    props.isLoadingItem = false;
    setup();
    expect(wrapper).toMatchSnapshot();
  });

  // componentDidMount
  it('should render fetchItems when category props is defined', () => {
    setup();
    expect(props.fetchItems).toHaveBeenCalledWith(props.categoryId, props.page);
  });
  it('should direct to home when category is undefined', () => {
    props.category = undefined;
    setup();
    expect(props.fetchItems).not.toHaveBeenCalledWith(props.categoryId, props.page);
    expect(props.history.push).toHaveBeenCalledWith('/');
  });
  it('should push to last page when page in query is too big', () => {
    props.page = 10;
    setup();
    expect(props.history.push).toHaveBeenCalledWith(`${props.categoryId}?page=${props.totalPages - 1}`)
  });
  // componentDidUpdate
  it('should fetch items only when categoryId || page change', () => {
    setup();
    expect(props.fetchItems).toBeCalledTimes(1);
    wrapper.setProps({ categoryId: 1 });
    expect(props.fetchItems).toBeCalledTimes(1);
    wrapper.setProps({ categoryId: 2 });
    expect(props.fetchItems).toBeCalledTimes(2);
  });
  it('should direct to last page when page in query is too big', () => {
    setup();
    wrapper.setProps({ page: 100 });
    expect(props.history.push).toHaveBeenCalledWith(`${props.categoryId}?page=${props.totalPages - 1}`)
  });

  // interactions
  it('should refetchItem on delete successfully an item', () => {
    setup();
    wrapper.instance().onDeleteSuccess();
    expect(props.fetchItems).toHaveBeenCalledTimes(2);
  });
  it('should redirect on pagination Clicked', () => {
    setup();
    wrapper.instance().onPageClick({}, 3);
    expect(props.history.push).toBeCalledWith(`/categories/${props.categoryId}?page=3`)
  })
});

describe('component/Category/CategoryContainer (mapStateToProps)', () => {
  let state; let match; let
    location;
  beforeEach(() => {
    state = { category: { byId: { 1: 'Category' } }, item: {}, user: { userId: 1 } };
    match = { params: { categoryId: '1' } };
    location = { search: '?page=2' };
  });

  it('should return the right categoryId and page from path', () => {
    expect(mapStateToProps(state, { match, location }).categoryId).toBe(1);
    expect(mapStateToProps(state, { match, location }).page).toBe(2);
  })
});
