
import React from 'react';
import { shallow, configure } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import { CategoryContainer } from '../CategoryContainer';
import CategoryDetails from '../CategoryDetails';
import ItemList from '../../Item/ItemList';

configure({ adapter: new Adapter() })

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
    expect(wrapper.find(CategoryDetails).length).toBe(1);
    expect(props.fetchItems).toHaveBeenCalledWith(props.categoryId);
  });
  it('should render danger Alert / not fetchItems / navigate when category props is undefined', () => {
    props.category = undefined;
    setup();
    expect(wrapper.find(CategoryDetails).length).toBe(0);
    expect(wrapper.find('[variant="danger"]').length).toBe(1);
    expect(props.fetchItems).not.toHaveBeenCalled();
    expect(props.history.push).toHaveBeenCalledWith('/');
  });
  it('should render ItemList when itemList.length > 0', () => {
    props.itemList = [{ name: 'item 1', description: 'desc' }];
    setup();
    expect(wrapper.find(ItemList).length).toBe(1);
  }); it('should render Alert when itemList is empty', () => {
    setup();
    expect(wrapper.find('[variant="info"]').length).toBe(1);
  });
})
