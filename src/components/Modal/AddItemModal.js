import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import * as selector from '../../reducers';
import { addItem } from '../../actions/item';
import BaseFormModal from '../Base/BaseFormModal';

import { addItemModal } from '../../utils/initModalForm';

export const AddItemModal = ({ addItem, categories }) => {
  const { initialState, fields, validate } = addItemModal();
  fields[fields.findIndex((f) => f.name === 'category_id')].options = categories;
  initialState.inputValue.category_id = categories[0];
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
