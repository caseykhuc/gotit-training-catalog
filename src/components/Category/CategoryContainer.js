import React from 'react';
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import { Alert } from 'react-bootstrap';
import queryString from 'query-string';

import PropTypes from 'prop-types';
import CategoryDetails from './CategoryDetails';
import ItemList from '../Item/ItemList';

import { fetchItems } from '../../actions/item';
import { getItems } from '../../reducers';


class CategoryContainer extends React.Component {
  componentDidMount() {
    const { categoryId, fetchItems } = this.props;
    fetchItems(categoryId);
  }

  componentDidUpdate(prevState) {
    const { categoryId, page, fetchItems } = this.props;
    if (categoryId !== prevState.categoryId || page !== prevState.page) { fetchItems(categoryId); }
  }

  render() {
    const { category, itemList } = this.props;
    return category && itemList ? (
      <div>
        <CategoryDetails category={category} />
        {itemList.length ? (
          <ItemList items={itemList} />
        ) : (
          <Alert variant="info">
              Category currently has no items. Add one now!
            </Alert>
        )}
      </div>
    ) : (
      <Alert variant="danger">Can't find category</Alert>
    );
  }
}

const mapStateToProps = (state, { match, location }) => {
  const categoryId = Number(match.params.categoryId);
  const page = queryString.parse(location.search).page || 0;

  return {
    category: state.category.byId[categoryId],
    itemList: getItems(state),
    categoryId,
    page,
  };
};

CategoryContainer.propTypes = {
  categoryId: PropTypes.number.isRequired,
  category: PropTypes.object,
  fetchItems: PropTypes.func.isRequired,
  itemList: PropTypes.arrayOf(PropTypes.object).isRequired,
  page: PropTypes.number.isRequired,
}

CategoryContainer.defaultProps = {
  category: {},
}

export default withRouter(connect(mapStateToProps, { fetchItems })(CategoryContainer));
