import React from 'react';
import { ListGroup } from 'react-bootstrap'
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import ModifyButton from './ModifyButton';

export const ItemList = ({ items, userId: userCurrent, categoryId }) => {
  const renderItems = () => items.map(({ id, name, userId }) => (
    <ListGroup.Item className="d-flex justify-content-between align-items-center" key={id}>
      <Link to={`/categories/items/${categoryId}/${id}`} key={id}>
        {name}
      </Link>
      {userId === userCurrent && (
        <ModifyButton categoryId={categoryId} itemId={id} />
      )}
    </ListGroup.Item>

  ));

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
    user_id: PropTypes.number,
  })).isRequired,
  userId: PropTypes.number,
}

const mapStateToProps = ({ user }) => ({
  userId: user.userId,
})

export default connect(mapStateToProps)(ItemList);
