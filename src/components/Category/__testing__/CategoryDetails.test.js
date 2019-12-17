import React from 'react';
import { shallow, configure } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import CategoryDetails from '../CategoryDetails';

configure({ adapter: new Adapter() })

describe('component/Category/CategoryDetails', () => {
  let props;
  let wrapper;
  const update = () => {
    wrapper.update();
  };
  const setup = () => {
    wrapper = shallow(<CategoryDetails {...props} />);
    update();
  };
  beforeEach(() => {
    props = {
      category: {},
    }
  });
  it('should render correctly', () => {
    setup();
    expect(wrapper).toMatchSnapshot();
  })
})
