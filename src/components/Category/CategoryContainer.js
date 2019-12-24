/* eslint-disable no-shadow */
import React from 'react';
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import { Alert } from 'react-bootstrap';
import queryString from 'query-string';

import PropTypes from 'prop-types';
import CategoryDetails from './CategoryDetails';
import ItemList from '../Item/ItemList';
import ItemPagination from '../Item/ItemPagination';

import { fetchItems } from '../../actions/item';
import { getItems } from '../../reducers';
import LoadingPage from '../LoadingPage';
import config from '../../config';

export class CategoryContainer extends React.Component {
  componentDidMount() {
    const {
      categoryId, category, fetchItems, history,
    } = this.props;
    // direct app to home page when no category is equivalent to categoryId
    if (category) { fetchItems(categoryId); } else history.push('/');
  }

  componentDidUpdate(prevState) {
    const { categoryId, page, fetchItems } = this.props;
    if (categoryId !== prevState.categoryId
      || page !== prevState.page) {
      fetchItems(categoryId, page);
    }
  }

  // conditionally render based on loading items state
  renderList = () => {
    const {
      itemList, categoryId, isLoadingItem,
    } = this.props;
    if (itemList.length) return <ItemList items={itemList} categoryId={categoryId} />
    if (isLoadingItem) return <LoadingPage />
    return (
      <Alert variant="info">
        Category currently has no items. Add one now!
      </Alert>
    );
  }

  onPageClick = (e, page) => {
    const { history, categoryId } = this.props;
    history.push(`/categories/${categoryId}?page=${page}`);
  }

  render() {
    const {
      category,
      totalPages,
      page,
    } = this.props;
    return category ? (
      <div className="w-75 mx-auto">
        <CategoryDetails category={category} />
        {this.renderList()}
        <ItemPagination totalPages={totalPages} currentPage={page} onPageClick={this.onPageClick} />
      </div>
    ) : (
        <Alert variant="danger">Can't find category</Alert>
      );
  }
}

export const mapStateToProps = (state, { match, location }) => {
  const categoryId = Number(match.params.categoryId);
  const page = Number(queryString.parse(location.search).page || 0);

  return {
    category: state.category.byId[categoryId],
    itemList: getItems(state),
    categoryId,
    page,
    isLoadingItem: state.item.isLoading,
    totalPages: Math.ceil(state.item.totalItems / config.ITEM_PER_PAGE),
  };
};

CategoryContainer.propTypes = {
  categoryId: PropTypes.number.isRequired,
  fetchItems: PropTypes.func.isRequired,
  page: PropTypes.number.isRequired,
  history: PropTypes.object.isRequired,
  isLoadingItem: PropTypes.bool.isRequired,
  category: PropTypes.shape({
    name: PropTypes.string,
    description: PropTypes.string,
  }),
  itemList: PropTypes.arrayOf(PropTypes.object),
}

export default withRouter(connect(mapStateToProps, { fetchItems })(CategoryContainer));
