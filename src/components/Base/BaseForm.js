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
}) => (
    <div onKeyDown={onKeyDown}>
      {fields.map(({ name, type, options }) => (
        <Form.Group controlId={name} key={name}>
          {type !== 'select'
            ? (
              <Form.Control
                type={type}
                name={name}
                value={inputValue[name]}
                placeholder={`Enter ${name}`}
                onChange={onInputChange}
                isInvalid={inputError[name]}
              />
            )
            : (
              <Form.Control
                as="select"
                name={name}
                onChange={onInputChange}
                isInvalid={inputError[name]}
              >
                {options.map(({ name, id }) => <option value={id} key={id}>{`Category ${name}`}</option>)}
              </Form.Control>
            )}
          <Form.Control.Feedback type="invalid">{inputError[name]}</Form.Control.Feedback>
        </Form.Group>
      ))}
      {requestError && <Alert variant="danger">{requestError}</Alert>}
    </div>
  )

BaseForm.propTypes = {
  onInputChange: PropTypes.func.isRequired,
  onKeyDown: PropTypes.func.isRequired,
  inputError: PropTypes.object.isRequired,
  inputValue: PropTypes.object.isRequired,
  fields: PropTypes.arrayOf(PropTypes.shape({
    name: PropTypes.string,
    value: PropTypes.string,
  })),
  requestError: PropTypes.string,
}

export default BaseForm;
