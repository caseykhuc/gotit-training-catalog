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

export const signInUser = (body) => async (dispatch) => {
  const res = await dispatch({
    type: userTypes.SIGN_IN_USER,
    promise: api.signInUser(body)
      .then((res) => res.accessToken),
  });
  if (res.success) {
    dispatch(fetchUser());
  }
  return res;
};

export const signOutUser = () => ({
  // sync
  type: userTypes.SIGN_OUT_USER,
});
