import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Card } from 'react-bootstrap';
import { withRouter } from 'react-router-dom';
import PropTypes from 'prop-types';

import LoadingPage from 'components/Common/LoadingPage';
import ModifyButton from 'components/Common/ModifyButton';
import NotFoundPage from 'components/Common/NotFoundPage';
import { getItem } from 'reducers';
import { fetchItem } from 'actions/item';
import { formatDateString } from 'utils';

export class Item extends Component {
  state = { notFound: false }

  componentDidMount() {
    const {
      categoryId, itemId,
    } = this.props;
    this.fetchItem(categoryId, itemId);
  }

  componentDidUpdate(prevState) {
    const {
      categoryId, itemId,
    } = this.props;

    /* re-fetch item in case new item added
      when Item still mounted
    */
    if (categoryId !== prevState.categoryId
      || itemId !== prevState.itemId) {
      this.fetchItem(categoryId, itemId);
    }
  }

  fetchItem = async (categoryId, itemId) => {
    const { fetchItem } = this.props;
    const res = await fetchItem(categoryId, itemId);

    if (!res.success) {
      this.setState({ notFound: true })
    } else {
      this.setState({ notFound: false })
    }
  }

  onDeleteSuccess = () => {
    const { history, categoryId } = this.props;
    history.push(`/categories/${categoryId}`);
  }

  render() {
    const {
      item, userCurrent, categoryId, itemId, isLoadingItem,
    } = this.props;
    const { notFound } = this.state;

    if (isLoadingItem) return <LoadingPage />;

    if (notFound) return <NotFoundPage />;

    if (item) {
      const {
        id, name, description, price, userId, created, updated,
      } = item;

      return (
        <Card style={{
          width: '50%',
          margin: '0 auto',
        }}
        >
          <Card.Header className="d-flex justify-content-between align-items-center">
            <div>
              <h4>{`Item ${id}`}</h4>
              <small><i>{created && formatDateString(created)}</i></small>
            </div>
            <h3>{`$${price}`}</h3>
          </Card.Header>
          <Card.Body className="text-center" style={{ paddingRight: '10%', paddingLeft: '10%' }}>

            <Card.Title>{name}</Card.Title>
            <Card.Text style={{ minHeight: '7rem', textAlign: 'left' }}>
              {description}
            </Card.Text>
            <Card.Text>
              <small className="text-muted">
                {updated && `Last updated: ${formatDateString(updated)}`}
              </small>
            </Card.Text>
            {userCurrent === userId && (
              <ModifyButton
                categoryId={categoryId}
                itemId={itemId}
                currentValue={{ name, description, price }}
                onDeleteSuccess={this.onDeleteSuccess}
              />
            )}
          </Card.Body>
        </Card>
      )
    }
    return '';
  }
}

export const mapStateToProps = (state, { match }) => {
  const { itemId, categoryId } = match.params;
  const { user, item } = state;
  return {
    itemId: Number(itemId),
    categoryId: Number(categoryId),
    item: getItem(state, itemId),
    userCurrent: user.userId,
    isLoadingItem: item.isLoading,
  }
}

Item.propTypes = {
  itemId: PropTypes.number.isRequired,
  categoryId: PropTypes.number.isRequired,
  history: PropTypes.shape({
    push: PropTypes.func.isRequired,
  }).isRequired,
  isLoadingItem: PropTypes.bool.isRequired,
  fetchItem: PropTypes.func.isRequired,
  item: PropTypes.shape({
    id: PropTypes.number.isRequired,
    name: PropTypes.string.isRequired,
    description: PropTypes.string,
    price: PropTypes.number.isRequired,
    userId: PropTypes.number.isRequired,
    created: PropTypes.string,
    updated: PropTypes.string,
  }),
  userCurrent: PropTypes.number,
}

export default withRouter(connect(mapStateToProps, { fetchItem })(Item));
