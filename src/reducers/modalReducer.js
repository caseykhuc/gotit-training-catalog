import { modalTypes } from '../constants/actionTypes';

const initialState = {
  current: null,
  props: {},
};

const modalReducer = (state = initialState, action) => {
  switch (action.type) {
    case modalTypes.SHOW_MODAL:
      const { key, props } = action.payload;
      return { current: key, props };

    case modalTypes.HIDE_MODAL:
      return { ...initialState };

    default:
      return state;
  }
};

export default modalReducer;
