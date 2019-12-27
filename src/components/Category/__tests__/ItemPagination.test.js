import React from 'react';
import { shallow } from 'enzyme';
import { Pagination } from 'react-bootstrap';
import ItemPagination from '../ItemPagination';

describe('component/Item/ItemPagination', () => {
  let props;
  let wrapper;
  let pagiFirst;
  let pagiPrev;
  let pagiItem;
  let pagiNext;
  let pagiLast;

  const update = () => {
    wrapper.update();
    pagiFirst = wrapper.find(Pagination.First);
    pagiPrev = wrapper.find(Pagination.Prev);
    pagiItem = wrapper.find(Pagination.Item);
    pagiNext = wrapper.find(Pagination.Next);
    pagiLast = wrapper.find(Pagination.Last);
  };
  const setup = () => {
    wrapper = shallow(<ItemPagination {...props} />);
    update();
  };
  beforeEach(() => {
    props = {
      totalPages: 5,
      currentPage: 0,
      onPageClick: jest.fn(),
    }
  });
  it('should render correctly', () => {
    setup();
    expect(wrapper).toMatchSnapshot();

    props.currentPage = 5;
    setup();
    expect(wrapper).toMatchSnapshot();
  });
  it('should invoke onPageClick properly', () => {
    props.currentPage = 3;
    setup();
    expect(pagiItem).toHaveLength(props.totalPages);

    pagiFirst.simulate('click', {});
    expect(props.onPageClick).toBeCalledWith({}, 0);
    pagiPrev.simulate('click', {});
    expect(props.onPageClick).toBeCalledWith({}, props.currentPage - 1);
    pagiNext.simulate('click', {});
    expect(props.onPageClick).toBeCalledWith({}, props.currentPage + 1);
    pagiLast.simulate('click', {});
    expect(props.onPageClick).toBeCalledWith({}, props.totalPages - 1);
  });
})
