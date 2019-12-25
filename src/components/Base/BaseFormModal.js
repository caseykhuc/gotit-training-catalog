import React from 'react';
import PropTypes from 'prop-types';
import _ from 'lodash';
import BaseModal from 'components/Base/BaseModal';
import BaseForm from 'components/Base/BaseForm';
import { hideModal } from 'actions/modal';
import { connect } from 'react-redux';

class BaseFormModal extends React.Component {
  state = this.props.initialState

  onInputChange = (e) => {
    const { name, value } = e.target;
    const { inputValue } = this.state;

    const newValue = { ...inputValue, [name]: value };
    const { validate } = this.props;

    // set validation error along with user input
    this.setState(validate ? {
      inputValue: newValue,
      inputError: validate(newValue),
    } : {
        inputValue: newValue,
      });
  }

  onFormSubmit = async () => {
    const {
      onAction, initialState, validate, hideModal, onSuccess,
    } = this.props;
    const { inputValue } = this.state;

    // prevent empty submission
    if (!_.values(inputValue).some((x) => !_.isEmpty(x))) {
      this.setState({ requestError: 'Empty input' });
      return;
    }

    // prevent invalid request body
    if (validate && !_.isEmpty(validate(inputValue))) {
      return;
    }

    const res = await onAction(inputValue);
    if (!res.success) {
      this.setState((typeof res.message === 'object')
        ? { inputError: res.message }
        : { inputError: {}, requestError: res.message })
    } else {
      this.setState(initialState);
      hideModal();
      /**
       * navigate / actions when Form is successfully submitted
       * */
      if (onSuccess) {
        /* onSuccess(res.payload); */
        onSuccess(res.payload);
      }
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

    /* console.log(this.state); */

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
  hideModal: PropTypes.func.isRequired,
  onSuccess: PropTypes.func,
  title: PropTypes.string,
  validate: PropTypes.func,
}

export default connect(null, { hideModal })(BaseFormModal);
