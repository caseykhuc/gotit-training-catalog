import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { signinUser } from 'actions/user';
import BaseFormModal from 'components/Base/BaseFormModal';

export const SignInModal = ({ signinUser }) => {
  const initialState = {
    inputValue: {
      username: '',
      password: '',
    },
    inputError: {
    },
    requestError: '',
  };

  const fields = [
    { name: 'username', type: 'text' },
    { name: 'password', type: 'password' }];

  return (
    <BaseFormModal title="SIGN IN" fields={fields} initialState={initialState} onAction={signinUser} />
  )
}

SignInModal.propTypes = {
  signinUser: PropTypes.func.isRequired,
}

export default connect(null, { signinUser })(SignInModal);
