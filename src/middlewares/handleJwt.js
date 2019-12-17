import { userTypes } from '../constants/actionTypes';
// store accessToken to localStorage when LOGIN_USER_SUCCESS
// clear when LOGOUT_USER

const persistJwt = (store) => (next) => (action) => {
  switch (action.type) {
    case userTypes.LOGIN_USER_SUCCESS:
      localStorage.setItem('access_token', action.payload.token);
      break

    case userTypes.LOGOUT_USER:
      localStorage.setItem('access_token', undefined);
      break

    default:
  }

  return next(action);
};

export default persistJwt;
