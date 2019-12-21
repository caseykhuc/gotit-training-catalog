import React from 'react';
import { connect } from 'react-redux';
import BaseModal from '../Base/BaseModal';
import confirmMessage from '../../utils/confirmMessage';
import { deleteItemAndRefetch } from '../../actions/item';

export const DeleteItemModal = ({ categoryId, itemId, deleteItemAndRefetch }) => (
  <BaseModal
    title="DELETE CONFIRM"
    onAccept={() => deleteItemAndRefetch(categoryId, itemId)}
  >
    <p>{confirmMessage.confirmDelete}</p>
  </BaseModal>
)

export default connect(null, { deleteItemAndRefetch })(DeleteItemModal)
