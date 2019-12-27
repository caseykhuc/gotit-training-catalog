import React from 'react';
import { Pagination } from 'react-bootstrap';
import PropTypes from 'prop-types';
import _ from 'lodash';

// return which pages should be shown currently
export const pages = (totalPages, currentPage, neighbors = 1) => {
  const pagesShown = neighbors * 2 + 1;

  if (totalPages <= pagesShown) {
    return _.range(totalPages);
  }

  if (currentPage <= neighbors) {
    return _.range(pagesShown);
  }

  if (currentPage >= totalPages - neighbors) {
    return _.range(totalPages - pagesShown, totalPages);
  }

  return _.range(currentPage - neighbors, currentPage + neighbors + 1);
}

// currentPage starts with 0
const ItemPagination = ({ currentPage, totalPages, onPageClick }) => (
  <Pagination className="justify-content-center m-4">
    <Pagination.First
      onClick={(e) => onPageClick(e, 0)}
      disabled={currentPage <= 0}
    />
    <Pagination.Prev
      onClick={(e) => onPageClick(e, currentPage - 1)}
      disabled={currentPage <= 0}
    />
    {pages(totalPages, currentPage).map((page) => (
      <Pagination.Item
        onClick={(e) => onPageClick(e, page)}
        active={page === currentPage}
        key={page}
      >
        {page + 1}
      </Pagination.Item>
    ))}
    <Pagination.Next
      onClick={(e) => onPageClick(e, currentPage + 1)}
      disabled={currentPage + 1 >= totalPages}
    />
    <Pagination.Last
      onClick={(e) => onPageClick(e, totalPages - 1)}
      disabled={currentPage + 1 >= totalPages}
    />
  </Pagination>
)

ItemPagination.propTypes = {
  totalPages: PropTypes.number.isRequired,
  currentPage: PropTypes.number.isRequired,
  onPageClick: PropTypes.func.isRequired,
};

export default ItemPagination;
