import React from 'react';
import CategoryDetails from './CategoryDetails';
import ItemList from '../Item/ItemList';
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import { fetchItems } from '../../actions/item';
import { Alert } from 'react-bootstrap';

class Category extends React.Component {
  componentDidMount() {
    const { itemList, categoryId } = this.props;
    if (!itemList.length) {
      this.props.fetchItems(categoryId);
    }
  }

  render() {
    const { category, itemList } = this.props;
    return category && itemList ? (
      <div>
        <CategoryDetails category={category} />
        <ItemList items={itemList} />
      </div>
    ) : (
      <Alert variant='danger'>Can't find category</Alert>
    );
  }
}

const mapStateToProps = (state, { match }) => {
  const categoryId = match.params.categoryId;
  return {
    category: state.category.byId[categoryId],
    itemList: state.item,
    categoryId,
  };
};

export default withRouter(connect(mapStateToProps, { fetchItems })(Category));
