import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import * as selector from '../../reducers';
import { addItem } from '../../actions/item';
import BaseFormModal from '../Base/BaseFormModal';

import { addItemModal } from '../../utils/initModalForm';

export const AddItemModal = ({ addItem, categories }) => {
  const { initialState, fields, validate } = addItemModal();
  fields[3].options = categories;
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
}

const mapStateToProps = (state) => ({
  categories: selector.getCategories(state),
})

export default connect(mapStateToProps, { addItem })(AddItemModal);
