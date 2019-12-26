import { userTypes } from 'constants/actionTypes';
import * as api from 'utils/api';

export const fetchUser = () => ({
  type: userTypes.FETCH_USER,
  promise: api.fetchUser()
    .then((res) => res.id),
});

export const registerUser = ({
  username, email, name, password,
}) => async (dispatch) => {
  const res = await dispatch({
    type: userTypes.REGISTER_USER,
    promise: api.registerUser({
      username, email, name, password,
    }).then((res) => res.accessToken),
  })
  if (res.success) {
    dispatch(fetchUser());
  }
  return res;
};

export const signinUser = (body) => async (dispatch) => {
  const res = await dispatch({
    type: userTypes.SIGNIN_USER,
    promise: api.signinUser(body)
      .then((res) => res.accessToken),
  });
  if (res.success) {
    dispatch(fetchUser());
  }
  return res;
};

export const signoutUser = () => ({
  // sync
  type: userTypes.SIGNOUT_USER,
});
