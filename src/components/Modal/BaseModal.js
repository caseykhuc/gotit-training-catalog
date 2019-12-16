import React from 'react';
import { Modal, Button } from 'react-bootstrap';
import { hideModal } from '../../actions';
import { connect } from 'react-redux';

class BaseModal extends React.Component {
  render() {
    return (
      <Modal.Dialog>
        <Modal.Header closeButton onClick={this.props.hideModal}>
          <Modal.Title>Modal title</Modal.Title>
        </Modal.Header>

        <Modal.Body>
          <p>Modal body text goes here.</p>
        </Modal.Body>

        <Modal.Footer>
          <Button variant='secondary'>Close</Button>
          <Button variant='primary'>Save changes</Button>
        </Modal.Footer>
      </Modal.Dialog>
    );
  }
}

export default connect(null, { hideModal })(BaseModal);
