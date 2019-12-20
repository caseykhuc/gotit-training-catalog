import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import modalKeys from '../constants/modelKeys';
import RegisterModal from './Modal/RegisterModal';
import SignInModal from './Modal/SignInModal';

export const ModalContainer = ({ modal }) => {
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

  // return <div>ModalContainer {modal.current}</div>;
  return (
    <div style={{
      position: 'absolute',
      top: '50%',
      left: '50%',
      transform: 'translate(-50%, -50%)',
    }}
    >
      {renderModal()}
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
