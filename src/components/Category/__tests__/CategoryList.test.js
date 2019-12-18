
import React from 'react';
import { shallow, configure } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import CategoryList from '../CategoryList';

configure({ adapter: new Adapter() })

describe('component/Category/CategoryList', () => {
  let props;
  let wrapper;
  const update = () => {
    wrapper.update();
  };
  const setup = () => {
    wrapper = shallow(<CategoryList {...props} />);
    update();
  };
  beforeEach(() => {
    props = {
      categories: [],
    }
  });
  it('should render correctly', () => {
    setup();
    expect(wrapper).toMatchSnapshot();
  })
})
