import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import validator from 'validator';

import BaseFormModal from 'components/Common/BaseFormModal';
import { addItem } from 'actions/item';
import * as selector from 'reducers';
import { errorMessage, MIN_NAME_LENGTH } from 'constants/formValidation';

export const validate = ({
  name, price, categoryId,
}) => {
  const inputError = {};
  if (name && name.length < MIN_NAME_LENGTH) {
    inputError.name = errorMessage.Name.TOO_SHORT
  }
  if (price && !validator.isNumeric(price)) {
    inputError.price = errorMessage.Price.IS_NOT_NUMERIC;
  }
  if (!categoryId) {
    inputError.categoryId = errorMessage.Category.IS_NOT_DEFINED;
  }
  return inputError;
};

export const AddItemModal = ({
  addItem, categories, onSuccess,
}) => {
  const initialState = {
    inputValue: {
      name: '',
      description: '',
      price: '',
      categoryId: categories[0].id,
    },
    inputError: {
    },
    requestError: '',
  };

  const fields = [
    { name: 'name', type: 'text' },
    { name: 'description', type: 'textarea' },
    { name: 'price', type: 'text' },
    { name: 'categoryId', type: 'select', options: categories },
  ];

  return (
    <BaseFormModal
      title="ADD ITEM"
      fields={fields}
      initialState={initialState}
      onAction={addItem}
      onSuccess={onSuccess}
      validate={validate}
    />
  )
}

AddItemModal.propTypes = {
  addItem: PropTypes.func.isRequired,
  categories: PropTypes.arrayOf(PropTypes.object).isRequired,
  onSuccess: PropTypes.func.isRequired,
}

const mapStateToProps = (state) => ({
  categories: selector.getCategories(state),
})

export default connect(mapStateToProps, { addItem })(AddItemModal);
