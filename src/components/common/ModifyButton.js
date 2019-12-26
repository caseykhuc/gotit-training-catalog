import React from 'react';
import { connect } from 'react-redux';
import { ButtonGroup, Button } from 'react-bootstrap';
import modalKeys from 'constants/modelKeys';
import { showModal } from 'actions/modal';
import PropTypes from 'prop-types';

export const ModifyButton = ({
  categoryId, itemId, currentValue, showModal, onDeleteSuccess,
}) => (
  <ButtonGroup>
    <Button
      className="mr-1"
      onClick={() => showModal(modalKeys.EDIT_ITEM_MODAL, {
        categoryId,
        itemId,
        currentValue,
      })}
    >
        Edit
    </Button>
    <Button
      variant="danger"
      onClick={() => showModal(modalKeys.DELETE_ITEM_MODAL, {
        categoryId,
        itemId,
        onSuccess: onDeleteSuccess,
      })}
    >
        Delete
    </Button>
  </ButtonGroup>
)

ModifyButton.propTypes = {
  categoryId: PropTypes.number.isRequired,
  itemId: PropTypes.number.isRequired,
  showModal: PropTypes.func.isRequired,
  currentValue: PropTypes.shape({
    name: PropTypes.string,
    description: PropTypes.string,
    price: PropTypes.number,
  }),
  onDeleteSuccess: PropTypes.func,
}

export default connect(null, { showModal })(ModifyButton);
