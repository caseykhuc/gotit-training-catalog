import React from 'react';
import { Form } from 'react-bootstrap';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import BaseModal from './BaseModal';
import { registerUser } from '../../actions/user';

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
    const { registerUser } = this.props;
    const { username, password } = this.state;
    registerUser(username, password);
  }

  onKeyPress = (e) => {
    console.log(e.key);
    if (e.key === 'Enter') {
      console.log('???')
      this.onFormSubmit();
    }
  }

  render() {
    const { username, password } = this.state;

    return (
      <div onKeyDown={(e) => this.onKeyPress(e)}>
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
  registerUser: PropTypes.func.isRequired,
}

export default connect(null, { registerUser })(SignInModal);
