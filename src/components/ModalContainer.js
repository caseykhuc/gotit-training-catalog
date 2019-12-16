import React from 'react';
import { connect } from 'react-redux';
import modalKeys from '../constants/modelKeys';
import RegisterModal from './Modal/RegisterModal';
import SignInModal from './Modal/SignInModal';

const ModalContainer = ({ modal }) => {
  const renderModal = () => {
    switch (modal.current) {
      case modalKeys.REGISTER_MODAL:
        return <RegisterModal />;
      case modalKeys.SIGNIN_MODAL:
        return <SignInModal />;
      default:
        return '';
    }
  };

  //return <div>ModalContainer {modal.current}</div>;
  return <div>{renderModal()}</div>;
};

const mapStateToProps = (state) => {
  return {
    modal: state.modal,
  };
};

export default connect(mapStateToProps)(ModalContainer);
