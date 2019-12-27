import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { signInUser } from 'actions/user';

import BaseFormModal from 'components/Base/BaseFormModal';

export const SignInModal = ({ signInUser }) => {
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
    <BaseFormModal title="SIGN IN" fields={fields} initialState={initialState} onAction={signInUser} />
  )
}

SignInModal.propTypes = {
  signInUser: PropTypes.func.isRequired,
}

export default connect(null, { signInUser })(SignInModal);
