import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import BaseModal from 'components/Base/BaseModal';
import confirmMessage from 'utils/confirmMessage';
import { deleteItemAndRefetch } from 'actions/item';

export const DeleteItemModal = ({ categoryId, itemId, deleteItemAndRefetch }) => (
  <BaseModal
    title="DELETE CONFIRM"
    onAccept={() => deleteItemAndRefetch(categoryId, itemId)}
  >
    <p>{confirmMessage.confirmDelete}</p>
  </BaseModal>
)

DeleteItemModal.propTypes = {
  categoryId: PropTypes.number.isRequired,
  itemId: PropTypes.number.isRequired,
  deleteItemAndRefetch: PropTypes.func.isRequired,
}

export default connect(null, { deleteItemAndRefetch })(DeleteItemModal)
