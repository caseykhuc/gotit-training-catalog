import { userTypes } from '../constants/actionTypes';
import { request } from '../api';

/* body = {
  'username': 'username',
  'email': 'email',
  'name': 'name',
  'password': 'password'
}; */
export const registerUser = (username, password) => ({
  type: userTypes.REGISTER_USER,
  payload: { username, password },
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
  type: userTypes.LOGIN_USER,
  promise: request('/user', {
    method: 'POST',
    body: JSON.stringify(body),
    headers: { 'Content-Type': 'application/json' },
  }),
});

export const signoutUser = () => ({
  // sync
});
