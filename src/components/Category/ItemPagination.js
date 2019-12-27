import React from 'react';
import { Pagination } from 'react-bootstrap';
import PropTypes from 'prop-types';

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
    {[...Array(totalPages).keys()].map((page) => (
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
