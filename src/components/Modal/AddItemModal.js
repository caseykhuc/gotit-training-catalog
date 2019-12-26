import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import * as selector from 'reducers';
import { addItem } from 'actions/item';
import BaseFormModal from 'components/Base/BaseFormModal';

import validator from 'validator';
import * as errorMessage from 'constants/inputError';

export const validate = ({
  name, price, categoryId,
}) => {
  const inputError = {};
  if (name && name.length < 5) inputError.name = errorMessage.name.tooShort;
  if (price && !validator.isNumeric(price)) {
    inputError.price = errorMessage.price.isNotNumeric;
  }
  if (!categoryId) {
    inputError.categoryId = errorMessage.category.isNotDefined;
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
