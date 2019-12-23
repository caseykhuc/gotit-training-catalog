import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Card } from 'react-bootstrap';
import { withRouter } from 'react-router-dom';
import PropTypes from 'prop-types';
import { getItem } from '../../reducers';
import { fetchItem } from '../../actions/item';
import ModifyButton from './ModifyButton';
import { formatDateString } from '../../utils/utils';

export class ItemSingle extends Component {
  componentDidMount() {
    const {
      item, fetchItem, categoryId, itemId,
    } = this.props;
    if (!item) {
      fetchItem(categoryId, itemId);
    }
  }

  render() {
    const {
      item, userCurrent, categoryId, itemId,
    } = this.props;
    if (item) {
      const {
        id, name, description, user_id, created, updated,
      } = item;

      return (
        <Card style={{
          width: '50%', margin: '0 auto',
        }}
        >
          <Card.Header>
            <h4>{`Card ${id}`}</h4>
            <small><i>{created && formatDateString(created)}</i></small>
          </Card.Header>
          <Card.Body className="text-center">
            <Card.Title>{name}</Card.Title>
            <Card.Text style={{ minHeight: '7rem' }}>
              {description}
            </Card.Text>
            <Card.Text>
              <small className="text-muted">
                {updated && `Last updated: ${formatDateString(updated)}`}
              </small>
            </Card.Text>
            {userCurrent === user_id && (
              <ModifyButton categoryId={categoryId} itemId={itemId} />
            )}
          </Card.Body>
        </Card>
      )
    }
    return <div>Ahihi</div>;
  }
}

export const mapStateToProps = (state, { match }) => {
  const { itemId, categoryId } = match.params;
  const { user } = state;
  return {
    itemId: Number(itemId),
    categoryId: Number(categoryId),
    item: getItem(state, itemId),
    userCurrent: user.userId,
  }
}

ItemSingle.propTypes = {
  itemId: PropTypes.number.isRequired,
  categoryId: PropTypes.number.isRequired,
  item: PropTypes.shape({
    id: PropTypes.number.isRequired,
    name: PropTypes.string.isRequired,
    description: PropTypes.string.isRequired,
    user_id: PropTypes.number.isRequired,
    created: PropTypes.string,
    updated: PropTypes.string,
  }),
  userCurrent: PropTypes.number,
  fetchItem: PropTypes.func.isRequired,
}

export default withRouter(connect(mapStateToProps, { fetchItem })(ItemSingle));
