import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

import { registerUser } from '../../actions/user';
import BaseFormModal from '../Base/BaseFormModal';

import { registerModal } from '../../utils/initModalForm';

export const EditItemModal = ({ registerUser }) => {
  const { initialState, fields, validate } = registerModal;
  return (
    <BaseFormModal title="ADD" fields={fields} initialState={initialState} onAction={registerUser} validate={validate} />
  )
}


EditItemModal.propTypes = {
  registerUser: PropTypes.func.isRequired,
}

export default connect(null, { registerUser })(EditItemModal);
