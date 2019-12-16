import {
  userTypes,
  categoryTypes,
  itemTypes,
  modalTypes,
} from '../constants/actionTypes';
import { request } from '../api';

/* export const fetchItem = () => ({
  type: actionTypes.FETCH_ITEM,
  promise: request('/item', { method: 'GET' }),
}); */

/* body = {
  'username': 'username',
  'email': 'email',
  'name': 'name',
  'password': 'password'
}; */
export const registerUser = (body) => ({
  type: userTypes.SIGNUP_USER,
  promise: request('/user', {
    method: 'POST',
    body: JSON.stringify(body),
    headers: { 'Content-Type': 'application/json' },
  }),
});

/* body = {
  'username': 'username',
  'email': 'email',
  'name': 'name',
  'password': 'password'
}; */
export const loginUser = (body) => ({
  type: userTypes.LOGIN_USER,
  promise: request('/user', {
    method: 'POST',
    body: JSON.stringify(body),
    headers: { 'Content-Type': 'application/json' },
  }),
});

export const logoutUser = () => ({
  //sync
});

export const fetchCategory = (offset = 0, limit = 10) => ({
  type: categoryTypes.FETCH_CATEGORY,
  promise: request(`/categories/`, {
    method: 'GET',
  }),
  /* promise: request(`/categories/?offset=${offset}&limit=${limit}`, {
    method: 'GET',
  }), */
});

export const fetchItems = (categoryId, offset = 0, limit = 10) => ({
  //
});

export const addItem = () => {};
export const editItem = () => {};

export const deleteItemAndRefetch = () => (dispatch) => {};

export const showModal = (modalKey, props = {}) => ({
  type: modalTypes.SHOW_MODAL,
  payload: {
    modalKey,
    props,
  },
});

export const hideModal = () => ({
  type: modalTypes.HIDE_MODAL,
});
