import React from 'react';
import { withRouter, Link } from 'react-router-dom';
import { Button, ButtonGroup } from 'react-bootstrap';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { showModal } from 'actions/modal';
import { signoutUser } from 'actions/user';
import modalKeys from 'constants/modelKeys';

export const Header = ({
  isSignedIn, showModal, signoutUser, history,
}) => {
  // handle actions after successfully add item
  const onAddSuccess = (requestValue, responseValue) => {
    const { categoryId } = requestValue; // submitted categoryId
    const { id } = responseValue; // received itemId

    // direct to SingleItem page
    history.push(`/categories/items/${categoryId}/${id}`);
  }

  return (
    <div
      style={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
      }}
    >
      <Link to="/" style={{ color: 'black', textDecoration: 'none' }}>
        <h1>Catalog Header</h1>
      </Link>
      {isSignedIn
        ? (
          <ButtonGroup>
            <Button
              onClick={() => showModal(modalKeys.ADD_ITEM_MODAL, {
                onSuccess: onAddSuccess,
              })}
              className="add-btn"
            >
              Add Item
            </Button>
            <Button
              className="auth-btn"
              variant="secondary"
              onClick={signoutUser}
            >
              Sign Out
            </Button>
          </ButtonGroup>
        )
        : (
          <ButtonGroup>
            <Button
              onClick={() => showModal(modalKeys.REGISTER_MODAL)}
              className="register-btn"
            >
              Register
            </Button>
            <Button
              onClick={() => showModal(modalKeys.SIGNIN_MODAL)}
              className="auth-btn"
            >
              Sign In
            </Button>
          </ButtonGroup>
        )}
    </div>
  )
}

Header.propTypes = {
  isSignedIn: PropTypes.bool,
  showModal: PropTypes.func.isRequired,
  signoutUser: PropTypes.func.isRequired,
  history: PropTypes.object.isRequired,
}


export default withRouter(connect(null, { showModal, signoutUser })(Header));
