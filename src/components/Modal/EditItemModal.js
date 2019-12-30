import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import validator from 'validator';

import BaseFormModal from 'components/Common/BaseFormModal';
import { editItem } from 'actions/item';
import * as selector from 'reducers';
import { errorMessage, MIN_NAME_LENGTH } from 'constants/formValidation';

export const validate = ({
  name, price,
}) => {
  const priceString = String(price);
  const inputError = {};
  if (name && name.length < MIN_NAME_LENGTH) {
    inputError.name = errorMessage.Name.TOO_SHORT
  }
  if (priceString && !validator.isNumeric(priceString)) {
    inputError.price = errorMessage.Price.IS_NOT_NUMERIC
  }
  return inputError;
};

export const EditItemModal = ({
  editItem, currentValue = {},
}) => {
  const initialState = {
    inputValue: currentValue,
    inputError: {
    },
    requestError: '',
  };

  const fields = [
    { name: 'name', type: 'text' },
    { name: 'description', type: 'textarea' },
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

export const mapDispatchToProps = (dispatch, { categoryId, itemId }) => ({
  editItem: (body) => dispatch(editItem(categoryId, itemId)(body)),
})

export default connect(mapStateToProps, mapDispatchToProps)(EditItemModal);
