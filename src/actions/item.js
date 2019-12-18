import { itemTypes } from '../constants/actionTypes';
import * as api from '../api';

/* export const fetchItem = () => ({
  type: actionTypes.FETCH_ITEM,
  promise: request('/item', { method: 'GET' }),
}); */
export const fetchItems = (categoryId, page = 0) => ({
  type: itemTypes.FETCH_ITEMS,
  promise: api.fetchItems(categoryId, page),
})

export const addItem = () => { };
export const editItem = () => { };

export const deleteItemAndRefetch = () => (dispatch) => { };
