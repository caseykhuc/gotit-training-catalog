import React from 'react';
import { Button, ButtonGroup } from 'react-bootstrap';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { showModal } from '../actions/modal';
import { signoutUser } from '../actions/user';
import modalKeys from '../constants/modelKeys';

export const Header = ({ isSignedIn, showModal, signoutUser }) => (
  <div
    style={{
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'space-between',
    }}
  >
    <h1>Catalog Header</h1>
    {isSignedIn
      ? (
        <ButtonGroup>
          <Button>
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

Header.propTypes = {
  isSignedIn: PropTypes.bool.isRequired,
  showModal: PropTypes.func.isRequired,
  signoutUser: PropTypes.func.isRequired,
}


export default connect(null, { showModal, signoutUser })(Header);
