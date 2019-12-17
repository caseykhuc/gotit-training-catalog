import React from 'react';
import { Modal, Button } from 'react-bootstrap';
import { connect } from 'react-redux';
import { hideModal } from '../../actions/modal';

const BaseModal = ({ title, hideModal, children }) => (
  <Modal show onHide={hideModal} centered>
    <Modal.Header closeButton>
      <Modal.Title>{title}</Modal.Title>
    </Modal.Header>
    <Modal.Body>{children}</Modal.Body>
    <Modal.Footer>
      <Button variant="secondary" onClick={hideModal}>
        Close
      </Button>
      <Button variant="primary" onClick={hideModal}>
        Save Changes
      </Button>
    </Modal.Footer>
  </Modal>
)

export default connect(null, { hideModal })(BaseModal);
