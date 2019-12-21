import React from 'react';
import { connect } from 'react-redux';
import { ButtonGroup, Button } from 'react-bootstrap';
import modalKeys from '../../constants/modelKeys';
import { showModal } from '../../actions/modal';

export const ModifyButton = ({ categoryId, itemId, showModal }) => (
  <ButtonGroup>
    <Button className="mr-1">
      Edit
    </Button>
    <Button
      variant="danger"
      onClick={() => showModal(modalKeys.DELETE_ITEM_MODAL, { categoryId, itemId })}
    >
      Delete
    </Button>
  </ButtonGroup>
)

export default connect(null, { showModal })(ModifyButton);
