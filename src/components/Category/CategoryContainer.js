/* eslint-disable no-shadow */
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


export class CategoryContainer extends React.Component {
  componentDidMount() {
    const {
      categoryId, category, fetchItems, history,
    } = this.props;
    if (category) { fetchItems(categoryId); } else history.push('/');
  }

  componentDidUpdate(prevState) {
    const { categoryId, page, fetchItems } = this.props;
    if (categoryId !== prevState.categoryId || page !== prevState.page) { fetchItems(categoryId); }
  }

  render() {
    const { category, itemList } = this.props;
    return category ? (
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

export const mapStateToProps = (state, { match, location }) => {
  const categoryId = Number(match.params.categoryId);
  const page = Number(queryString.parse(location.search).page || 0);

  return {
    category: state.category.byId[categoryId],
    itemList: getItems(state),
    categoryId,
    page,
  };
};

CategoryContainer.propTypes = {
  categoryId: PropTypes.number.isRequired,
  category: PropTypes.shape({
    name: PropTypes.string,
    description: PropTypes.string,
  }),
  fetchItems: PropTypes.func.isRequired,
  itemList: PropTypes.arrayOf(PropTypes.object).isRequired,
  page: PropTypes.number.isRequired,
  history: PropTypes.object.isRequired,
}

export default withRouter(connect(mapStateToProps, { fetchItems })(CategoryContainer));
