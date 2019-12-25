/* eslint-disable no-shadow */
import React from 'react';
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import { Alert } from 'react-bootstrap';
import queryString from 'query-string';

import PropTypes from 'prop-types';
import CategoryDetails from 'components/Category/CategoryDetails';
import ItemList from 'components/Item/ItemList';
import ItemPagination from 'components/Item/ItemPagination';
import LoadingPage from 'components/LoadingPage';

import { fetchItems } from 'actions/item';
import { getItems } from 'reducers';
import config from 'configuration';

export class CategoryContainer extends React.Component {
  componentDidMount() {
    const {
      categoryId, category, fetchItems, history, page,
    } = this.props;
    // direct app to home page when no category is equivalent to categoryId
    if (category) { fetchItems(categoryId, page); } else history.push('/');
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
      itemList, categoryId, isLoadingItem, totalPages, page,
    } = this.props;
    if (itemList.length && !isLoadingItem) {
      return (
        <div>
          <ItemList
            items={itemList}
            categoryId={categoryId}
            page={page}
          />
          <ItemPagination
            totalPages={totalPages}
            currentPage={page}
            onPageClick={this.onPageClick}
          />
        </div>
      );
    }
    if (isLoadingItem) {
      return <LoadingPage />
    }
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
    } = this.props;
    return category ? (
      <div className="w-75 mx-auto">
        <CategoryDetails category={category} />
        {this.renderList()}
      </div>
    ) : (<Alert variant="danger">Can't find category</Alert>);
  }
}

export const mapStateToProps = (state, { match, location }) => {
  const categoryId = Number(match.params.categoryId);
  const totalPages = Math.ceil(state.item.totalItems / config.ITEM_PER_PAGE)

  // in case page is queryString is empty
  const page = Number(queryString.parse(location.search).page)
    || 0;

  return {
    category: state.category.byId[categoryId],
    itemList: getItems(state),
    categoryId,
    page,
    isLoadingItem: state.item.isLoading,
    totalPages,
  };
};

CategoryContainer.propTypes = {
  categoryId: PropTypes.number.isRequired,
  fetchItems: PropTypes.func.isRequired,
  page: PropTypes.number.isRequired,
  totalPages: PropTypes.number.isRequired,
  history: PropTypes.object.isRequired,
  isLoadingItem: PropTypes.bool.isRequired,
  category: PropTypes.shape({
    name: PropTypes.string,
    description: PropTypes.string,
  }),
  itemList: PropTypes.arrayOf(PropTypes.object),
}

export default withRouter(connect(mapStateToProps, { fetchItems })(CategoryContainer));
