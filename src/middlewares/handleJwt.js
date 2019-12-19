import { userTypes } from '../constants/actionTypes';
// store accessToken to localStorage when LOGIN_USER_SUCCESS
// clear when LOGOUT_USER

const persistJwt = () => (next) => (action) => {
  switch (action.type) {
    case userTypes.SIGNIN_USER_SUCCESS:
    case userTypes.REGISTER_USER_SUCCESS:
      localStorage.setItem('access_token', action.payload);
      break

    case userTypes.SIGNOUT_USER:
      localStorage.setItem('access_token', undefined);
      break

    default:
  }

  return next(action);
};

export default persistJwt;
