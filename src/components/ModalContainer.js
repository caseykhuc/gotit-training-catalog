import React from 'react';
import { connect } from 'react-redux';

const ModalContainer = ({ modal }) => {
  return <div>ModalContainer {modal.current}</div>;
};

const mapStateToProps = (state) => {
  return {
    modal: state.modal,
  };
};

export default connect(mapStateToProps)(ModalContainer);
