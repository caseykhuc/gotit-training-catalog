import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import * as selector from 'reducers';
import { addItem } from 'actions/item';
import BaseFormModal from 'components/Base/BaseFormModal';

import validator from 'validator';
import * as errorMessage from 'utils/inputError';

const validate = ({
  name, price, categoryId,
}) => {
  const inputError = {};
  if (name && name.length < 5) inputError.name = errorMessage.name.tooShort;
  if (price && !validator.isNumeric(price)) {
    inputError.price = errorMessage.price.tooSimple;
  }
  if (!categoryId) {
    inputError.categoryId = errorMessage.category.isNotDefined;
  }
  return inputError;
};

export const AddItemModal = ({ addItem, categories }) => {
  const initialState = {
    inputValue: {
      name: '',
      description: '',
      price: '',
      categoryId: categories[0],
    },
    inputError: {
    },
    requestError: '',
  };

  const fields = [
    { name: 'name', type: 'text' },
    { name: 'description', type: 'text' },
    { name: 'price', type: 'text' },
    { name: 'categoryId', type: 'select', options: categories },
  ];

  return (
    <BaseFormModal
      title="ADD ITEM"
      fields={fields}
      initialState={initialState}
      onAction={addItem}
      validate={validate}
    />
  )
}

AddItemModal.propTypes = {
  addItem: PropTypes.func.isRequired,
  categories: PropTypes.arrayOf(PropTypes.object).isRequired,
}

const mapStateToProps = (state) => ({
  categories: selector.getCategories(state),
})

export default connect(mapStateToProps, { addItem })(AddItemModal);
