import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import BaseModal from 'components/Base/BaseModal';
import confirmMessage from 'utils/confirmMessage';
import { deleteItem } from 'actions/item';

export const DeleteItemModal = ({ categoryId, itemId, deleteItem }) => (
  <BaseModal
    title="DELETE CONFIRM"
    onAccept={() => deleteItem(categoryId, itemId)}
  >
    <p>{confirmMessage.confirmDelete}</p>
  </BaseModal>
)

DeleteItemModal.propTypes = {
  categoryId: PropTypes.number.isRequired,
  itemId: PropTypes.number.isRequired,
  deleteItem: PropTypes.func.isRequired,
}

export default connect(null, { deleteItem })(DeleteItemModal)
