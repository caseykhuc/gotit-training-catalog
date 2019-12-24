import React from 'react';
import { ListGroup } from 'react-bootstrap'
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import ModifyButton from './ModifyButton';

export const ItemList = ({ items, userCurrent, categoryId }) => {
  const renderItems = () => items.map(({
    id, name, description, price, userId,
  }) => (
      <ListGroup.Item className="d-flex justify-content-between align-items-center" key={id}>
        <Link to={`/categories/items/${categoryId}/${id}`} key={id}>
          {name}
        </Link>
        {userId === userCurrent && (
          <ModifyButton
            categoryId={categoryId}
            itemId={id}
            currentValue={{ name, description, price }}
          />
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
    id: PropTypes.number.isRequired,
    name: PropTypes.string.isRequired,
    userId: PropTypes.number.isRequired,
  })).isRequired,
  categoryId: PropTypes.number.isRequired,
  userCurrent: PropTypes.number,
}

const mapStateToProps = ({ user }) => ({
  userCurrent: user.userId,
})

export default connect(mapStateToProps)(ItemList);
