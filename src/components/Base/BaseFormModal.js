import React from 'react';
import PropTypes from 'prop-types';
import _ from 'lodash';
import BaseModal from './BaseModal';
import BaseForm from './BaseForm';

class BaseFormModal extends React.Component {
  state = this.props.initialState

  onInputChange = (e) => {
    const { name, value } = e.target;
    const { inputValue } = this.state;

    const newValue = { ...inputValue, [name]: value };
    const { validate } = this.props;

    this.setState(validate ? {
      inputValue: newValue,
      inputError: validate(newValue),
    } : {
        inputValue: newValue,
      });
  }

  onFormSubmit = async () => {
    const { onAction, initialState, validate } = this.props;
    const { inputValue, inputError } = this.state;

    console.log(inputValue);
    if (!_.values(inputValue).some((x) => !_.isEmpty(x))) {
      this.setState({ requestError: 'Empty input' });
      return;
    }

    if (validate && !_.isEmpty(validate(inputValue))) {
      return;
    }

    if (inputError) {
      const res = await onAction(inputValue);
      if (!res.success) {
        this.setState((typeof res.message === 'object')
          ? { inputError: res.message }
          : { inputError: {}, requestError: res.message })
      } else this.setState(initialState)
    }
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

    const { fields, title } = this.props;
    return (
      <BaseModal title={title} onAccept={() => this.onFormSubmit()}>
        <BaseForm
          onInputChange={(e) => this.onInputChange(e)}
          inputValue={inputValue}
          inputError={inputError}
          requestError={requestError}
          fields={fields}
          onKeyDown={(e) => this.onKeyDown(e)}
        />
      </BaseModal>
    )
  }
}

BaseFormModal.propTypes = {
  fields: PropTypes.arrayOf(PropTypes.shape({
    name: PropTypes.string,
    value: PropTypes.string,
  })),
  initialState: PropTypes.shape({
    inputValue: PropTypes.object,
    inputError: PropTypes.object,
    requestError: PropTypes.string,
  }),
  onAction: PropTypes.func.isRequired,
  title: PropTypes.string,
  validate: PropTypes.func,
}

export default BaseFormModal;
