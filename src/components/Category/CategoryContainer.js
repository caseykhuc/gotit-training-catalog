/* eslint-disable no-shadow */
import React from 'react';
import { withRouter, Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { Alert, ListGroup } from 'react-bootstrap';
import queryString from 'query-string';

import PropTypes from 'prop-types';
import CategoryDetails from 'components/Category/CategoryDetails';
import ItemPagination from 'components/Item/ItemPagination';
import LoadingPage from 'components/common/LoadingPage';
import ModifyButton from 'components/common/ModifyButton';

import { fetchItems } from 'actions/item';
import { getItems } from 'reducers';
import config from 'configuration';
import NotFoundPage from 'components/common/NotFoundPage';

export class CategoryContainer extends React.Component {
  state = { notFound: false }

  componentDidMount() {
    const {
      categoryId, category, page, isLoadingItem,
    } = this.props;

    // direct app to home page when no category is equivalent to categoryId
    if (category) {
      if (!isLoadingItem) {
        this.fetchItems(categoryId, page);
      }
    } else {
      this.setState({ notFound: true })
    }
  }

  componentDidUpdate(prevState) {
    const {
      categoryId, page, isLoadingItem,
    } = this.props;

    if (categoryId !== prevState.categoryId
      || page !== prevState.page) {
      if (!isLoadingItem) {
        this.fetchItems(categoryId, page);
      }
    }
  }

  fetchItems = async (categoryId, page) => {
    const { fetchItems } = this.props;
    const res = await fetchItems(categoryId, page);

    // render NotFoundPage when fetchItems fails
    if (!res.success) {
      this.setState({ notFound: true })
    } else {
      this.setState({ notFound: false })
    }
  }

  // render list of items
  renderItemList = () => {
    const {
      itemList, userCurrent, categoryId,
    } = this.props;
    return itemList.map(({
      id, name, description, price, userId,
    }) => (
      <ListGroup.Item
        className="d-flex justify-content-between align-items-center"
        key={id}
      >
        <Link to={`/categories/items/${categoryId}/${id}`} key={id}>
          {name}
        </Link>
        {userId === userCurrent && (
        <ModifyButton
          categoryId={categoryId}
          itemId={id}
          currentValue={{ name, description, price }}
          onDeleteSuccess={this.onDeleteSuccess}
        />
        )}
      </ListGroup.Item>
    ));
  }

  // handle actions after successfully delete item
  onDeleteSuccess = () => {
    const {
      isLoadingItem, fetchItems, categoryId, page,
    } = this.props;
    if (!isLoadingItem) {
      fetchItems(categoryId, page);
    }
  }

  // conditionally render based on loading items state
  renderItem = () => {
    const {
      itemList, isLoadingItem, totalPages, page,
    } = this.props;

    if (isLoadingItem) {
      return <LoadingPage />
    }
    if (itemList.length && !isLoadingItem) {
      return (
        <div className="my-4">
          {this.renderItemList()}
          <ItemPagination
            totalPages={totalPages}
            currentPage={page}
            onPageClick={this.onPageClick}
          />
        </div>
      );
    }

    // itemList is empty on non-loading state
    return (page > 0
      ? <NotFoundPage />
      : (
        <Alert variant="info">
        Category currently has no items. Add one now!
        </Alert>
      )
    );
  }

  onPageClick = (e, page) => {
    const { history, categoryId } = this.props;
    history.push(`/categories/${categoryId}?page=${page}`);
  }

  render() {
    const { category } = this.props;
    const { notFound } = this.state;

    if (notFound) {
      return <NotFoundPage />
    }
    return category ? (
      <div>
        <CategoryDetails category={category} />
        {this.renderItem()}
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
    userCurrent: state.user.userId,
  };
};

CategoryContainer.propTypes = {
  categoryId: PropTypes.number.isRequired,
  fetchItems: PropTypes.func.isRequired,
  page: PropTypes.number.isRequired,
  totalPages: PropTypes.number.isRequired,
  history: PropTypes.object.isRequired,
  isLoadingItem: PropTypes.bool.isRequired,
  userCurrent: PropTypes.number,
  category: PropTypes.shape({
    name: PropTypes.string,
    description: PropTypes.string,
  }),
  itemList: PropTypes.arrayOf(PropTypes.shape({
    id: PropTypes.number.isRequired,
    name: PropTypes.string.isRequired,
    userId: PropTypes.number.isRequired,
  })),
}

export default withRouter(connect(mapStateToProps, { fetchItems })(CategoryContainer));
