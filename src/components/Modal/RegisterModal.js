import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import BaseModal from '../Base/BaseModal';
import { registerUser } from '../../actions/user';
import BaseForm from '../Base/BaseForm';

export class RegisterModal extends React.Component {
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

  state = this.initialState

  fields = [{ name: 'username', type: 'text' },
    { name: 'email', type: 'email' },
    { name: 'name', type: 'text' },
    {
      name: 'password', type: 'password',
    }]

  onInputChange = (e) => {
    const { name, value } = e.target;
    const { inputValue } = this.state;
    this.setState({ inputValue: { ...inputValue, [name]: value } })
  }

  onFormSubmit = async () => {
    const { registerUser } = this.props;
    const { inputValue } = this.state;
    const res = await registerUser(inputValue);
    if (!res.success) {
      this.setState((typeof res.message === 'object')
        ? { inputError: res.message }
        : { inputError: {}, requestError: res.message })
    } else this.setState(this.initialState)
  }

  onKeyDown = (e) => {
    if (e.key === 'Enter') {
      this.onFormSubmit();
    }
  }

  render() {
    const {
      inputValue, inputError, requestError,
    } = this.state;
    return (
      <div onKeyDown={(e) => this.onKeyDown(e)}>
        <BaseModal title="REGISTER" onAccept={() => this.onFormSubmit()}>
          <BaseForm onInputChange={(e) => this.onInputChange(e)} inputValue={inputValue} inputError={inputError} requestError={requestError} fields={this.fields} />
        </BaseModal>
      </div>
    )
  }
}

RegisterModal.propTypes = {
  registerUser: PropTypes.func.isRequired,
}

export default connect(null, { registerUser })(RegisterModal);
