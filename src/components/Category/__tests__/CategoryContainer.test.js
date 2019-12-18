
import React from 'react';
import { shallow } from 'enzyme';
import { CategoryContainer } from '../CategoryContainer';
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
})
