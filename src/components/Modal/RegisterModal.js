import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import validator from 'validator';

import BaseFormModal from 'components/Common/BaseFormModal';
import { registerUser } from 'actions/user';
import * as errorMessage from 'constants/inputError';

export const validate = ({
  username, email, password, confirm,
}) => {
  const inputError = {};
  if (username && username.length < 5) inputError.username = errorMessage.username.tooShort;
  if (email && !validator.isEmail(email)) inputError.email = errorMessage.email.invalid;
  if (password && (password.length < 8
    || !validator.isAlphanumeric(password)
    || validator.isAlpha(password)
    || validator.isNumeric(password))) {
    inputError.password = errorMessage.password.tooSimple;
  }
  if (confirm && confirm !== password) {
    inputError.confirm = errorMessage.password.notMatch;
  }
  return inputError;
};

export const RegisterModal = ({ registerUser }) => {
  const initialState = {
    inputValue: {
      username: '',
      email: '',
      name: '',
      password: '',
      confirm: '',
    },
    inputError: {
    },
    requestError: '',
  };

  const fields = [
    { name: 'username', type: 'text' },
    { name: 'email', type: 'email' },
    { name: 'name', type: 'text' },
    { name: 'password', type: 'password' },
    { name: 'confirm', type: 'password' },
  ];

  return (
    <BaseFormModal
      title="REGISTER"
      fields={fields}
      initialState={initialState}
      onAction={registerUser}
      validate={validate}
    />
  )
}

RegisterModal.propTypes = {
  registerUser: PropTypes.func.isRequired,
}

export default connect(null, { registerUser })(RegisterModal);
