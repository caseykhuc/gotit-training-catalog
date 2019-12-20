import React from 'react';
import { ListGroup, Button, ButtonGroup } from 'react-bootstrap'
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

const ItemList = ({ items, userId }) => {
  // console.log(props);
  const renderItems = () => items.map((item) => (
    <ListGroup.Item className="d-flex justify-content-between align-items-center" key={item.id}>
      {item.name}
      {userId === item.userId && (
        <ButtonGroup className="">
          <Button>Edit</Button>
          <Button>Delete</Button>
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
