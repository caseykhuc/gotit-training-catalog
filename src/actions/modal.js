import { modalTypes } from 'constants/actionTypes';

export const showModal = (modalKey, props = {}) => ({
  type: modalTypes.SHOW_MODAL,
  payload: {
    modalKey,
    props,
  },
});

export const hideModal = () => ({
  type: modalTypes.HIDE_MODAL,
});
