import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import BaseModal from 'components/Base/BaseModal';
import confirmMessage from 'utils/confirmMessage';
import { deleteItem, fetchItems } from 'actions/item';
import { hideModal } from 'actions/modal';

export const DeleteItemModal = ({
  categoryId, itemId, deleteItem, fetchItems, hideModal, page,
}) => {
  const onAccept = async () => {
    const res = await deleteItem(categoryId, itemId);
    // hide modal when request is successful
    // refetch is handled elsewhere
    if (res.success) {
      hideModal();
      fetchItems(categoryId, page);
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
  page: PropTypes.number.isRequired,
  deleteItem: PropTypes.func.isRequired,
  fetchItems: PropTypes.func.isRequired,
  hideModal: PropTypes.func.isRequired,
}

export default connect(null, { deleteItem, hideModal, fetchItems })(DeleteItemModal)
