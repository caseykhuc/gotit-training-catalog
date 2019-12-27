import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { Alert } from 'react-bootstrap';

import BaseModal from 'components/Common/BaseModal';
import { deleteItem, fetchItems } from 'actions/item';
import { hideModal } from 'actions/modal';
import confirmMessage from 'constants/confirmMessage';

export const DeleteItemModal = ({
  categoryId, itemId, deleteItem, onSuccess, hideModal, error,
}) => {
  const onAccept = async () => {
    const { success } = await deleteItem(categoryId, itemId);
    // hide modal when request is successful
    // re-fetch is handled elsewhere
    if (success) {
      hideModal();
      onSuccess();
    }
  }

  return (
    <BaseModal
      title="DELETE CONFIRM"
      onAccept={onAccept}
    >
      <p>{confirmMessage.DELETE}</p>
      {error && <Alert variant="danger" class="error">{error}</Alert>}
    </BaseModal>
  )
}

const mapStateToProps = ({ item }) => ({
  error: item.error,
})

DeleteItemModal.propTypes = {
  categoryId: PropTypes.number.isRequired,
  itemId: PropTypes.number.isRequired,
  deleteItem: PropTypes.func.isRequired,
  onSuccess: PropTypes.func.isRequired,
  hideModal: PropTypes.func.isRequired,
  error: PropTypes.string.isRequired,
}

export default connect(mapStateToProps, { deleteItem, hideModal, fetchItems })(DeleteItemModal)
