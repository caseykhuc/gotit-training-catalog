import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import BaseModal from 'components/Base/BaseModal';
import confirmMessage from 'constants/confirmMessage';
import { deleteItem, fetchItems } from 'actions/item';
import { hideModal } from 'actions/modal';

export const DeleteItemModal = ({
  categoryId, itemId, deleteItem, onSuccess, hideModal,
}) => {
  const onAccept = async () => {
    const res = await deleteItem(categoryId, itemId);
    // hide modal when request is successful
    // re-fetch is handled elsewhere
    if (res.success) {
      hideModal();
      onSuccess();
    }
  }

  return (
    <BaseModal
      title="DELETE CONFIRM"
      onAccept={onAccept}
    >
      <p>{confirmMessage.confirmDelete}</p>
    </BaseModal>
  )
}

DeleteItemModal.propTypes = {
  categoryId: PropTypes.number.isRequired,
  itemId: PropTypes.number.isRequired,
  deleteItem: PropTypes.func.isRequired,
  onSuccess: PropTypes.func.isRequired,
  hideModal: PropTypes.func.isRequired,
}

export default connect(null, { deleteItem, hideModal, fetchItems })(DeleteItemModal)
