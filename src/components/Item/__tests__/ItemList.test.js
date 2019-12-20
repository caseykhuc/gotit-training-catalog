
import React from 'react';
import { shallow } from 'enzyme';
import { ButtonGroup } from 'react-bootstrap';
import { ItemList } from '../ItemList';

describe('component/ItemList', () => {
  let props;
  let wrapper;
  let btnGroup;

  const update = () => {
    wrapper.update();
    btnGroup = wrapper.find(ButtonGroup);
  };
  const setup = () => {
    wrapper = shallow(<ItemList {...props} />);
    update();
  };
  beforeEach(() => {
    props = {
      items: [{
        name: 'test',
        id: 0,
        user_id: 3,
      }],
    }
  });
  it('should render correctly', () => {
    setup();
    expect(wrapper).toMatchSnapshot();
  });
  it('should render btnGroup when userId match', () => {
    props.userId = 3;
    setup();
    expect(btnGroup.length).toBeTruthy();
  });
})
