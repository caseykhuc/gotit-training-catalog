import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

import { registerUser } from '../../actions/user';
import BaseFormModal from '../Base/BaseFormModal';

import { registerModal } from '../../utils/initModalForm';

export const RegisterModal = ({ registerUser }) => {
  const { initialState, fields, validate } = registerModal;
  return (
    <BaseFormModal title="REGISTER" fields={fields} initialState={initialState} onAction={registerUser} validate={validate} />
  )
}


RegisterModal.propTypes = {
  registerUser: PropTypes.func.isRequired,
}

export default connect(null, { registerUser })(RegisterModal);
