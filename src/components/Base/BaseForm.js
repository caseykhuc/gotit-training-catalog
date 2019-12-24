import React from 'react';
import { Form, Alert } from 'react-bootstrap';
import PropTypes from 'prop-types';

const BaseForm = ({
  onInputChange,
  inputError,
  requestError,
  inputValue,
  fields,
  onKeyDown,
}) => {
  const renderInput = ({ name, type, options }) => {
    switch (type) {
      case 'select':
        return (
          <Form.Control
            as="select"
            name={name}
            value={inputValue[name]}
            onChange={onInputChange}
            isInvalid={inputError[name]}
          >
            {options.map(({ name, id }) => <option value={id} key={id}>{`Category ${name}`}</option>)}
          </Form.Control>
        );
      case 'textarea':
        return (
          <Form.Control
            as={type}
            name="textarea"
            value={inputValue[name]}
            placeholder={`Enter ${name}`}
            onChange={onInputChange}
            isInvalid={inputError[name]}
          />
        )
      default:
        return (
          <Form.Control
            type={type}
            name={name}
            value={inputValue[name]}
            placeholder={`Enter ${name}`}
            onChange={onInputChange}
            isInvalid={inputError[name]}
          />
        )
    }
  };

  return (
    <div onKeyDown={onKeyDown}>
      {fields.map(({ name, type, options }) => (
        <Form.Group controlId={name} key={name}>
          {renderInput({ name, type, options })}
          <Form.Control.Feedback type="invalid">{inputError[name]}</Form.Control.Feedback>
        </Form.Group>
      ))}
      {requestError && <Alert variant="danger">{requestError}</Alert>}
    </div>
  )
}

BaseForm.propTypes = {
  onInputChange: PropTypes.func.isRequired,
  onKeyDown: PropTypes.func.isRequired,
  inputError: PropTypes.object.isRequired,
  inputValue: PropTypes.object.isRequired,
  fields: PropTypes.arrayOf(PropTypes.shape({
    name: PropTypes.string,
    type: PropTypes.string,
    options: PropTypes.arrayOf(PropTypes.object),
  })),
  requestError: PropTypes.string,
}

export default BaseForm;
