import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import * as selector from 'reducers';
import { editItem } from 'actions/item';
import BaseFormModal from 'components/Base/BaseFormModal';

import validator from 'validator';
import * as errorMessage from 'utils/inputError';

const validate = ({
  name, price,
}) => {
  const inputError = {};
  if (name && name.length < 5) inputError.name = errorMessage.name.tooShort;
  if (price && !validator.isNumeric(price)) {
    inputError.price = errorMessage.price.tooSimple;
  }
  return inputError;
};

export const EditItemModal = ({ editItem, currentValue = {} }) => {
  const initialState = {
    inputValue: currentValue,
    inputError: {
    },
    requestError: '',
  };

  const fields = [
    { name: 'name', type: 'text' },
    { name: 'description', type: 'text' },
    { name: 'price', type: 'text' },
  ];

  return (
    <BaseFormModal
      title="EDIT ITEM"
      fields={fields}
      initialState={initialState}
      onAction={editItem}
      validate={validate}
    />
  )
}

EditItemModal.propTypes = {
  editItem: PropTypes.func.isRequired,
  currentValue: PropTypes.shape({
    name: PropTypes.string,
    description: PropTypes.string,
    price: PropTypes.number,
  }),
}

const mapStateToProps = (state) => ({
  categories: selector.getCategories(state),
})

export default connect(mapStateToProps, { editItem })(EditItemModal);
