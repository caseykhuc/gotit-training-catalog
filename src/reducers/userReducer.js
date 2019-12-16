import { userTypes, itemTypes, categoryTypes } from '../actions/types';

const initialState = {
  current: {
    userId: '',
    token: '',
  },
  isLoading: false,
  error: '',
};

const current = (state = {}, action) => {
  switch (action.type) {
    case userTypes.LOGIN_USER_SUCCESS:
      return action.payload;
    default:
      return state;
  }
};

const userReducer = (state = initialState, action) => {
  switch (action.type) {
    case userTypes.LOGIN_USER_REQUEST:
    default:
      return state;
  }
};

export default userReducer;
