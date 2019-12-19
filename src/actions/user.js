import { userTypes } from '../constants/actionTypes';
import * as api from '../api';

/* body = {
  'username': 'username',
  'email': 'email',
  'name': 'name',
  'password': 'password'
}; */
export const registerUser = ({
  username, email, name, password,
}) => ({
  type: userTypes.REGISTER_USER,
  promise: api.registerUser({
    username, email, name, password,
  }),
  /* promise: request('/user', {
    method: 'POST',
    body: JSON.stringify(body),
    headers: { 'Content-Type': 'application/json' },
  }), */
});

/* body = {
  'username': 'username',
  'email': 'email',
  'name': 'name',
  'password': 'password'
}; */
export const signinUser = (body) => ({
  type: userTypes.SIGNIN_USER,
  promise: api.signinUser(body),
});

export const signoutUser = () => ({
  // sync
});
