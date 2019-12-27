import React from 'react';
import { shallow } from 'enzyme';
import ModifyButton from 'components/Common/ModifyButton';
import NotFoundPage from 'components/Common/NotFoundPage';
import { Category, mapStateToProps } from 'components/Category';

describe('component/Category', () => {
  let props;
  let wrapper;
  let modifyButton;
  let notFoundPage;

  const update = () => {
    wrapper.update();
    modifyButton = wrapper.find(ModifyButton);
    notFoundPage = wrapper.find(NotFoundPage);
  };
  const setup = () => {
    wrapper = shallow(<Category {...props} />);
    update();
  };
  beforeEach(() => {
    props = {
      categoryId: 1,
      fetchItems: jest.fn().mockResolvedValue({ success: true }),
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
  it('should render not found on invalid category', () => {
    props.category = undefined;
    setup();
    expect(notFoundPage).toBeTruthy();
  })

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
  it('should render NotFoundPage when fetchItems fails', async () => {
    props.fetchItems = jest.fn().mockResolvedValue({ success: false });
    setup();
    await new Promise((resolve) => {
      setImmediate(resolve)
    });
    wrapper.update();
    expect(notFoundPage).toBeTruthy();

    /* props.fetchItems = jest.fn().mockResolvedValue({ success: true });
    setup();
    await new Promise((resolve) => {
      setImmediate(resolve)
    });
    expect(notFoundPage.length).toBeFalsy(); */
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
  it('should render NotFoundPage when itemList is empty on page > 0', () => {
    props.page = 10;
    props.itemList = [];
    setup();
    props.category = undefined;
    setup();
    expect(notFoundPage).toBeTruthy();
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

describe('component/Category (mapStateToProps)', () => {
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
