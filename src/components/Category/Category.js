import React from 'react';
import CategoryDetails from './CategoryDetails';
import ItemList from '../Item/ItemList';
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import { fetchItems } from '../../actions/item';
import { getItems } from '../../reducers';
import { Alert } from 'react-bootstrap';
import queryString from 'query-string';

class Category extends React.Component {
  componentDidMount() {
    const { itemList, categoryId } = this.props;
    if (!itemList.length) {
      this.props.fetchItems(categoryId);
    }
  }

  componentDidUpdate() {
    console.log(this.props);
  }

  render() {
    const { category, itemList } = this.props;
    return category && itemList ? (
      <div>
        <CategoryDetails category={category} />
        {itemList.length ? (
          <ItemList items={itemList} />
        ) : (
          <Alert variant='info'>
            Category currently has no items. Add one now!
          </Alert>
        )}
      </div>
    ) : (
      <Alert variant='danger'>Can't find category</Alert>
    );
  }
}

const mapStateToProps = (state, { match, location }) => {
  const categoryId = match.params.categoryId;
  const page = queryString.parse(location.search).page || 0;
  //console.log(page);
  return {
    category: state.category.byId[categoryId],
    itemList: getItems(state),
    categoryId,
    page,
  };
};

export default withRouter(connect(mapStateToProps, { fetchItems })(Category));
