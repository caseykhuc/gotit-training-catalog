import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import modalKeys from 'constants/modelKeys';
import RegisterModal from 'components/Modal/RegisterModal';
import SignInModal from 'components/Modal/SignInModal';
import DeleteItemModal from 'components/Modal/DeleteItemModal';
import EditItemModal from 'components/Modal/EditItemModal'
import AddItemModal from 'components/Modal/AddItemModal';

export const ModalContainer = ({ modal }) => {
  const renderModal = ({ current, props }) => {
    switch (current) {
      case modalKeys.REGISTER_MODAL:
        return <RegisterModal />;
      case modalKeys.SIGN_IN_MODAL:
        return <SignInModal />;
      case modalKeys.DELETE_ITEM_MODAL:
        return <DeleteItemModal {...props} />;
      case modalKeys.EDIT_ITEM_MODAL:
        return <EditItemModal {...props} />;
      case modalKeys.ADD_ITEM_MODAL:
        return <AddItemModal {...props} />
      default:
        return '';
    }
  };

  // return <div>ModalContainer {modal.current}</div>;
  return (
    <div style={{
      position: 'absolute',
      top: '50%',
      left: '50%',
      transform: 'translate(-50%, -50%)',
    }}
    >
      {renderModal(modal)}
    </div>
  );
};

ModalContainer.propTypes = {
  modal: PropTypes.shape({
    current: PropTypes.string,
  }).isRequired,
}

const mapStateToProps = (state) => ({
  modal: state.modal,
});

export default connect(mapStateToProps)(ModalContainer);
