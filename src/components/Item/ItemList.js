import React from 'react';
import { ListGroup, Button, ButtonGroup } from 'react-bootstrap'
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

const ItemList = ({ items, userId, categoryId }) => {
  // console.log(props);
  const renderItems = () => items.map(({ id, name, user_id }) => (
    <ListGroup.Item className="d-flex justify-content-between align-items-center" key={id}>
      <Link to={`/categories/items/${categoryId}/${id}`} key={id}>
        {name}
      </Link>
      {userId === user_id && (
        <ButtonGroup>
          <Button className="mr-1">
            Edit
          </Button>
          <Button variant="secondary">
            Delete
          </Button>
        </ButtonGroup>
      )}
    </ListGroup.Item>

  ));

  console.log(items);
  console.log(userId);

  return (
    <ListGroup>
      {renderItems()}
    </ListGroup>
  );
};

ItemList.propTypes = {
  items: PropTypes.arrayOf(PropTypes.shape({
    id: PropTypes.number,
    name: PropTypes.string,
  })).isRequired,
  userId: PropTypes.number,
}

const mapStateToProps = ({ user }) => ({
  userId: user.userId,
})

export default connect(mapStateToProps)(ItemList);
