import actionTypes from '../actions/types';

const initialState = {
  current: {
    username: '',
    userId: '',
    token: '',
  },
};

const userReducer = (state, action) => {
  switch (action.type) {
    default:
      return state;
    /* case actionTypes. */
  }
};

export default userReducer;
