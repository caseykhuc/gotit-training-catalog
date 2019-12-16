import { categoryTypes } from '../constants/actionTypes';
import { request } from '../api';

export const fetchCategory = (offset = 0, limit = 10) => ({
  type: categoryTypes.FETCH_CATEGORY,
  promise: request(`/categories/`, {
    method: 'GET',
  }),
  /* promise: request(`/categories/?offset=${offset}&limit=${limit}`, {
    method: 'GET',
  }), */
});
