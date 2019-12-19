import React from 'react';
import { Form } from 'react-bootstrap';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import BaseModal from './BaseModal';
import { registerUser } from '../../actions/user';

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
  }

  state = this.initialState

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
      this.setState({ inputError: res.message })
    } else this.setState(this.initialState)
  }

  onKeyDown = (e) => {
    if (e.key === 'Enter') {
      this.onFormSubmit();
    }
  }

  renderForm = (fields) => {
    const {
      inputValue, inputError,
    } = this.state;
    console.log(inputValue);

    return fields.map(({ name, type }) => (
      <Form.Group controlId={name} key={name}>
        {/* <Form.Label>{name.toUpperCase()}</Form.Label> */}
        <Form.Control
          type={type}
          name={name}
          value={inputValue[name]}
          placeholder={`Enter ${name}`}
          onChange={this.onInputChange}
          isInvalid={inputError[name]}
        />
        <Form.Control.Feedback type="invalid">{inputError[name]}</Form.Control.Feedback>
      </Form.Group>
    ))
  }

  render() {
    return (
      <div onKeyDown={(e) => this.onKeyDown(e)}>
        <BaseModal title="REGISTER" onAccept={() => this.onFormSubmit()}>
          {this.renderForm(
            [{ name: 'username', type: 'text' },
              { name: 'email', type: 'email' },
              { name: 'name', type: 'text' },
              {
                name: 'password', type: 'password',
              }],
          )}
        </BaseModal>
      </div>
    )
  }
}

RegisterModal.propTypes = {
  registerUser: PropTypes.func.isRequired,
}

export default connect(null, { registerUser })(RegisterModal);
