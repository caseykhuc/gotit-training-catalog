import React from 'react';
import { Form, Alert } from 'react-bootstrap';
import PropTypes from 'prop-types';

const BaseForm = ({
  onInputChange, inputError, requestError, inputValue, fields,
}) => (
    <div>
      {fields.map(({ name, type }) => (
        <Form.Group controlId={name} key={name}>
          {/* <Form.Label>{name.toUpperCase()}</Form.Label> */}
          <Form.Control
            type={type}
            name={name}
            value={inputValue[name]}
            placeholder={`Enter ${name}`}
            onChange={onInputChange}
            isInvalid={inputError[name]}
          />
          <Form.Control.Feedback type="invalid">{inputError[name]}</Form.Control.Feedback>
        </Form.Group>
      ))}
      {requestError && <Alert variant="danger">{requestError}</Alert>}
    </div>
  )

BaseForm.propTypes = {
  onInputChange: PropTypes.func.isRequired,
  inputError: PropTypes.object.isRequired,
  inputValue: PropTypes.object.isRequired,
  fields: PropTypes.arrayOf(PropTypes.shape({
    name: PropTypes.string,
    value: PropTypes.string,
  })),
  requestError: PropTypes.string,
}

export default BaseForm;
