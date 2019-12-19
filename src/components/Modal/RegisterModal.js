import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { registerUser } from '../../actions/user';
import BaseFormModal from '../Base/BaseFormModal';

export class RegisterModal extends Component {
  initialState = {
    inputValue: {
      username: '',
      email: '',
      name: '',
      password: '',
    },
    inputError: {
    },
    requestError: '',
  }

  fields = [
    { name: 'username', type: 'text' },
    { name: 'email', type: 'email' },
    { name: 'name', type: 'text' },
    {
      name: 'password', type: 'password',
    }]

  render() {
    const { initialState, fields } = this;
    const { registerUser } = this.props;
    return (
      <BaseFormModal title="REGISTER" fields={fields} initialState={initialState} onAction={registerUser} />
    )
  }
}

RegisterModal.propTypes = {
  registerUser: PropTypes.func.isRequired,
}

export default connect(null, { registerUser })(RegisterModal);
