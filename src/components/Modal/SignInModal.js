import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { signinUser } from '../../actions/user';
import BaseFormModal from './BaseFormModal';

export class RegisterModal extends React.Component {
  initialState = {
    inputValue: {
      username: '',
      password: '',
    },
    inputError: {
    },
    requestError: '',
  }

  fields = [{ name: 'username', type: 'text' },
    {
      name: 'password', type: 'password',
    }]

  render() {
    const { initialState, fields } = this;
    const { signinUser } = this.props;
    return (
      <BaseFormModal fields={fields} initialState={initialState} onAction={signinUser} />
    )
  }
}

RegisterModal.propTypes = {
  signinUser: PropTypes.func.isRequired,
}

export default connect(null, { signinUser })(RegisterModal);
