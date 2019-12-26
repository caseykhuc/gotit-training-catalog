import { userTypes } from 'constants/actionTypes';

const initialState = {
  userId: null,
  isLoading: false,
  error: '',
}

export default (state = initialState, action) => {
  switch (action.type) {
    case userTypes.FETCH_USER_SUCCESS:
      return { ...state, isLoading: false, userId: action.payload };

    case userTypes.REGISTER_USER_REQUEST:
    case userTypes.SIGNIN_USER_REQUEST:
    case userTypes.FETCH_USER_REQUEST:
      return { ...state, isLoading: true }

    case userTypes.FETCH_USER_FAILURE:
    case userTypes.REGISTER_USER_FAILURE:
    case userTypes.SIGNIN_USER_FAILURE:
      return { ...state, isLoading: false, error: action.payload }

    case userTypes.SIGNOUT_USER:
      return { ...initialState };

    default:
      return state;
  }
};
