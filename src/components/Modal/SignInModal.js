import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { signinUser } from '../../actions/user';
import BaseFormModal from '../Base/BaseFormModal';

export class SignInModal extends Component {
  initialState = {
    inputValue: {
      username: '',
      password: '',
    },
    inputError: {
    },
    requestError: '',
  }

  fields = [{ name: 'username', type: 'text' }, {
    name: 'password', type: 'password',
  }]

  render() {
    const { initialState, fields } = this;
    const { signinUser } = this.props;
    return (
      <BaseFormModal title="SIGN IN" fields={fields} initialState={initialState} onAction={signinUser} />
    )
  }
}

SignInModal.propTypes = {
  signinUser: PropTypes.func.isRequired,
}

export default connect(null, { signinUser })(SignInModal);
