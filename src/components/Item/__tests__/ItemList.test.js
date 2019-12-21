
import React from 'react';
import { shallow } from 'enzyme';
import ModifyButton from '../ModifyButton';
import { ItemList } from '../ItemList';

describe('component/ItemList', () => {
  let props;
  let wrapper;
  let modifyButton;

  const update = () => {
    wrapper.update();
    modifyButton = wrapper.find(ModifyButton);
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
  it('should render modifyButton when userId match', () => {
    props.userId = 3;
    setup();
    expect(modifyButton.length).toBeTruthy();
  });
})
