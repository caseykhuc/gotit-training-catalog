// store accessToken to localStorage when LOGIN_USER_SUCCESS
// clear when LOGOUT_USER

const persistJwt = (store) => (next) => (action) => {
  switch (action.type) {
    case 'ON_INIT':
      break;

    case LOGIN_USER_SUCCESS:
      break;

    case LOGOUT_USER:
      break;

    default:
  }

  return next(action);
};
