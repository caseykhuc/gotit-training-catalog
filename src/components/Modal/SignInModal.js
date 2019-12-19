import React from 'react';
import { Form } from 'react-bootstrap';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import BaseModal from '../Base/BaseModal';
import { signinUser } from '../../actions/user';

export class SignInModal extends React.Component {
  state = {
    username: '',
    password: '',
  }

  onInputChange = (e) => {
    const { name, value } = e.target;
    this.setState({ [name]: value })
  }

  onFormSubmit = () => {
    const { signinUser } = this.props;
    const { username, password } = this.state;
    signinUser({ username, password });
  }

  onKeyDown = (e) => {
    if (e.key === 'Enter') {
      this.onFormSubmit();
    }
  }

  render() {
    const { username, password } = this.state;

    return (
      <div onKeyDown={(e) => this.onKeyDown(e)}>
        <BaseModal title="SIGN IN" onAccept={() => this.onFormSubmit()}>
          <Form.Group controlId="username">
            <Form.Label>Username</Form.Label>
            <Form.Control type="text" name="username" value={username} placeholder="Enter username" onChange={this.onInputChange} />
          </Form.Group>

          <Form.Group controlId="password">
            <Form.Label>Password</Form.Label>
            <Form.Control type="password" name="password" value={password} placeholder="Password" onChange={this.onInputChange} />
          </Form.Group>
        </BaseModal>
      </div>
    )
  }
}

SignInModal.propTypes = {
  signinUser: PropTypes.func.isRequired,
}

export default connect(null, { signinUser })(SignInModal);
