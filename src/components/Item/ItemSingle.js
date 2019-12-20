import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Card, ButtonGroup, Button } from 'react-bootstrap';
import { withRouter } from 'react-router-dom';
import PropTypes from 'prop-types';
import { getItem } from '../../reducers';
import { fetchItem } from '../../actions/item';
import { showModal } from '../../actions/modal';
import modalKeys from '../../constants/modelKeys';

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
    const { item, userCurrent, showModal } = this.props;
    if (item) {
      const {
        id, name, description, user_id,
      } = item;
      return (
        <Card style={{
          width: '50%', margin: '0 auto',
        }}
        >
          <Card.Header>{`Card ${id}`}</Card.Header>
          <Card.Body className="text-center">
            <Card.Title>{name}</Card.Title>
            <Card.Text style={{ minHeight: '7rem' }}>
              {description}
            </Card.Text>
            {userCurrent === user_id && (
              <ButtonGroup>
                <Button className="mr-1">
                  Edit
                </Button>
                <Button
                  variant="danger"
                  onClick={() => showModal(modalKeys.DELETE_MODAL)}
                >
                  Delete
                </Button>
              </ButtonGroup>
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
  }),
  userCurrent: PropTypes.number,
  fetchItem: PropTypes.func.isRequired,
  showModal: PropTypes.func.isRequired,
}

export default withRouter(connect(mapStateToProps, { fetchItem, showModal })(ItemSingle));
