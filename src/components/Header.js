import React from 'react';
import { Button, ButtonGroup } from 'react-bootstrap';
import { connect } from 'react-redux';
import { showModal } from '../actions/modal';
import { signoutUser } from '../actions/user';
import modalKeys from '../constants/modelKeys';

const Header = ({ isSignedIn, showModal, signoutUser }) => (
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
        <Button
          onClick={signoutUser}
        >
          Sign Out
        </Button>
      )
      : (
        <ButtonGroup>
          <Button
            onClick={() => showModal(modalKeys.REGISTER_MODAL)}
          >
            Register
          </Button>
          <Button onClick={() => showModal(modalKeys.SIGNIN_MODAL)}>
            Sign In
          </Button>
        </ButtonGroup>
      )}
  </div>
)


export default connect(null, { showModal, signoutUser })(Header);
