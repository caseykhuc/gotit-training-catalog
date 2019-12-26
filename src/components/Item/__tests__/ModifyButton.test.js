import React from 'react';
import { shallow } from 'enzyme';
import { ModifyButton } from '../ModifyButton';

describe('component/Item/ModifyButton', () => {
  let props;
  let wrapper;
  let deleteBtn;

  const update = () => {
    wrapper.update();
    deleteBtn = wrapper.find('[variant="danger"]');
  };
  const setup = () => {
    wrapper = shallow(<ModifyButton {...props} />);
    update();
  };
  beforeEach(() => {
    props = {
      categoryId: 1,
      itemId: 10,
      showModal: jest.fn(),
    }
  });
  it('should render correctly', () => {
    setup();
    expect(wrapper).toMatchSnapshot();
  });
  it('should invoke showModal when Button is clicked', () => {
    setup();
    expect(deleteBtn).toHaveLength(1);
    deleteBtn.simulate('click', {});
    expect(props.showModal).toHaveBeenCalled();
    /* expect(editBtn).toHaveLength(1); */
  })
})
