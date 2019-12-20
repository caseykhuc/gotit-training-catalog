import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Card, ButtonGroup, Button } from 'react-bootstrap';
import { withRouter } from 'react-router-dom';
import { getItem } from '../../reducers';
import { fetchItem } from '../../actions/item';

class ItemSingle extends Component {
  componentDidMount() {
    const {
      item, fetchItem, categoryId, itemId,
    } = this.props;
    console.log(this.props);
    if (!item) {
      fetchItem(categoryId, itemId);
    }
  }

  render() {
    const { item, userCurrent } = this.props;
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
                <Button variant="secondary">
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

const mapStateToProps = (state, { match }) => {
  const { itemId, categoryId } = match.params;
  const { user } = state;
  return {
    itemId,
    categoryId,
    item: getItem(state, itemId),
    userCurrent: user.userId,
  }
}

export default withRouter(connect(mapStateToProps, { fetchItem })(ItemSingle));
