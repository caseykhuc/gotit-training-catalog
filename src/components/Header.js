import React from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { showModal } from '../actions';
import modalKeys from '../constants/modelKeys';

class Header extends React.Component {
  render() {
    return (
      <div style={{ display: 'flex' }}>
        <h1>Ahihi Header</h1>
        <button onClick={() => this.props.showModal(modalKeys.REGISTER_MODAL)}>
          Register
        </button>
        <button onClick={() => this.props.showModal(modalKeys.SIGNIN_MODAL)}>
          Sign In
        </button>
      </div>
    );
  }
}

export default connect(null, { showModal })(Header);
