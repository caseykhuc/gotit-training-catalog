import React from 'react';
import { Button } from 'react-bootstrap';
import { connect } from 'react-redux';
import { showModal } from '../actions';
import modalKeys from '../constants/modelKeys';

class Header extends React.Component {
  render() {
    return (
      <div
        style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
        }}
      >
        <h1>Ahihi Header</h1>
        <div>
          <Button
            onClick={() => this.props.showModal(modalKeys.REGISTER_MODAL)}
          >
            Register
          </Button>
          <Button onClick={() => this.props.showModal(modalKeys.SIGNIN_MODAL)}>
            Sign In
          </Button>
        </div>
      </div>
    );
  }
}

export default connect(null, { showModal })(Header);
