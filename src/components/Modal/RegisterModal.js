import React from 'react';
import { Form } from 'react-bootstrap';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import BaseModal from './BaseModal';
import { registerUser } from '../../actions/user';

export class RegisterModal extends React.Component {
  state = {
    username: '',
    email: '',
    name: '',
    password: '',
  }

  onInputChange = (e) => {
    const { name, value } = e.target;
    this.setState({ [name]: value })
  }

  onFormSubmit = () => {
    const { registerUser } = this.props;
    const {
      username, email, name, password,
    } = this.state;
    registerUser(username, email, name, password);
  }

  onKeyDown = (e) => {
    if (e.key === 'Enter') {
      this.onFormSubmit();
    }
  }

  render() {
    const {
      username, email, name, password,
    } = this.state;

    return (
      <div onKeyDown={(e) => this.onKeyDown(e)}>
        <BaseModal title="REGISTER" onAccept={() => this.onFormSubmit()}>
          <Form.Group controlId="username">
            <Form.Label>Username</Form.Label>
            <Form.Control type="text" name="username" value={username} placeholder="Enter username" onChange={this.onInputChange} />
          </Form.Group>

          <Form.Group controlId="email">
            <Form.Label>Email</Form.Label>
            <Form.Control type="email" name="email" value={email} placeholder="Enter email" onChange={this.onInputChange} />
          </Form.Group>

          <Form.Group controlId="name">
            <Form.Label>Name</Form.Label>
            <Form.Control type="text" name="name" value={name} placeholder="Enter name" onChange={this.onInputChange} />
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

RegisterModal.propTypes = {
  registerUser: PropTypes.func.isRequired,
}

export default connect(null, { registerUser })(RegisterModal);
