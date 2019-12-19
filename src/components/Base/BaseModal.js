import React from 'react';
import { Modal, Button } from 'react-bootstrap';
import { connect } from 'react-redux';
import PropTypes from 'prop-types'
import { hideModal } from '../../actions/modal';

export const BaseModal = ({
  title, hideModal, onAccept, children,
}) => (
    <Modal show onHide={hideModal} centered>
      <Modal.Header closeButton>
        <Modal.Title>{title}</Modal.Title>
      </Modal.Header>
      <Modal.Body>{children}</Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={hideModal}>
          Close
      </Button>
        <Button variant="primary" onClick={onAccept}>
          Accept
      </Button>
      </Modal.Footer>
    </Modal>
  )

BaseModal.propTypes = {
  title: PropTypes.string.isRequired,
  hideModal: PropTypes.func.isRequired,
  onAccept: PropTypes.func.isRequired,
  children: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.node),
    PropTypes.node,
  ]),
}

export default connect(null, { hideModal })(BaseModal);
