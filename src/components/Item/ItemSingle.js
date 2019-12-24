import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Card } from 'react-bootstrap';
import { withRouter } from 'react-router-dom';
import PropTypes from 'prop-types';
import { getItem } from 'reducers';
import { fetchItem } from 'actions/item';
import { formatDateString } from 'utils/utils';
import LoadingPage from 'components/LoadingPage';
import ModifyButton from 'components/Item/ModifyButton';

export class ItemSingle extends Component {
  componentDidMount() {
    const {
      categoryId, itemId,
    } = this.props;
    this.fetchItem(categoryId, itemId);
  }

  fetchItem = async (categoryId, itemId) => {
    const { fetchItem } = this.props;
    const res = await fetchItem(categoryId, itemId);
    const { history } = this.props;
    if (!res.success) {
      history.push(`/categories/${categoryId}`)
    }
  }

  render() {
    const {
      item, userCurrent, categoryId, itemId, isLoadingItem,
    } = this.props;

    if (item) {
      const {
        id, name, description, userId, created, updated,
      } = item;

      return (
        <Card style={{
          width: '50%',
          margin: '0 auto',
        }}
        >
          <Card.Header>
            <h4>{`Item ${id}`}</h4>
            <small><i>{created && formatDateString(created)}</i></small>
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
              <ModifyButton categoryId={categoryId} itemId={itemId} />
            )}
          </Card.Body>
        </Card>
      )
    }
    if (isLoadingItem) return <LoadingPage />;
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

ItemSingle.propTypes = {
  itemId: PropTypes.number.isRequired,
  categoryId: PropTypes.number.isRequired,
  history: PropTypes.shape({
    push: PropTypes.func.isRequired,
  }).isRequired,
  item: PropTypes.shape({
    id: PropTypes.number.isRequired,
    name: PropTypes.string.isRequired,
    description: PropTypes.string.isRequired,
    userId: PropTypes.number.isRequired,
    created: PropTypes.string,
    updated: PropTypes.string,
  }),
  userCurrent: PropTypes.number,
  fetchItem: PropTypes.func.isRequired,
}

export default withRouter(connect(mapStateToProps, { fetchItem })(ItemSingle));
