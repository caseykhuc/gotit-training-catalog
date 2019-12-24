import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { signinUser } from 'actions/user';
import BaseFormModal from 'components/Base/BaseFormModal';
import { signinModal } from 'utils/initModalForm';

export const SignInModal = ({ signinUser }) => {
  const { initialState, fields } = signinModal;
  return (
    <BaseFormModal title="SIGN IN" fields={fields} initialState={initialState} onAction={signinUser} />
  )
}

SignInModal.propTypes = {
  signinUser: PropTypes.func.isRequired,
}

export default connect(null, { signinUser })(SignInModal);
