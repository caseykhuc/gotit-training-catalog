import React from 'react';
import { shallow } from 'enzyme';
import ModifyButton from 'components/Item/ModifyButton';
import { CategoryContainer, mapStateToProps } from '../CategoryContainer';

describe('component/Category/CategoryContainer', () => {
  let props;
  let wrapper;
  let modifyButton;

  const update = () => {
    wrapper.update();
    modifyButton = wrapper.find(ModifyButton);
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

    props.itemList = [];
    setup();
    expect(wrapper).toMatchSnapshot();

    props.isLoadingItem = false;
    setup();
    expect(wrapper).toMatchSnapshot();
  });

  it('should render ModifyButton correctly', () => {
    expect(modifyButton).toHaveLength(0);
    props.userCurrent = 3;
    setup();
    expect(modifyButton).toHaveLength(1);
  })

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
  it('should not fetch items when isLoadingItem is true', () => {
    setup();
    expect(props.fetchItems).toBeCalledTimes(1);
    wrapper.setProps({ categoryId: 2, isLoadingItem: true });
    expect(props.fetchItems).toBeCalledTimes(1);
  });
  it('should direct to last page when page in query is too big', () => {
    setup();
    wrapper.setProps({ page: 100 });
    expect(props.history.push).toHaveBeenCalledWith(`${props.categoryId}?page=${props.totalPages - 1}`)
  });

  // interactions
  it('should re-fetch item on delete successfully an item', () => {
    props.isLoadingItem = false;
    setup();
    wrapper.instance().onDeleteSuccess();
    expect(props.fetchItems).toHaveBeenCalledTimes(2);

    // do not re-fetch if isLoadingItem is true
    props.isLoadingItem = true;
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
  let state; let match; let location;
  let props;
  const setup = () => {
    props = mapStateToProps(state, { match, location });
  }
  beforeEach(() => {
    state = { category: { byId: { 1: 'Category' } }, item: {}, user: { userId: 1 } };
    match = { params: { categoryId: '1' } };
    location = { search: '?page=2' };
  });

  it('should return the right categoryId and page from path', () => {
    setup();
    expect(props.categoryId).toBe(1);
    expect(props.page).toBe(2);
  });
  it('should set default page to 0', () => {
    location = {};
    setup();
    expect(props.page).toBe(0);
  })
});
