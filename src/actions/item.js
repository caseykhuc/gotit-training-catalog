import { itemTypes } from '../constants/actionTypes';
import { request } from '../api';

/* export const fetchItem = () => ({
  type: actionTypes.FETCH_ITEM,
  promise: request('/item', { method: 'GET' }),
}); */
export const fetchItems = (categoryId, offset = 0, limit = 10) => {
  //
  console.log(`/items/?category_id=${categoryId}`);
  return ({
    type: itemTypes.FETCH_ITEMS,
    /* promise: request(
      `.categories/${categoryId}/items/?offset=${offset}&limit=${limit}`,
      { method: 'GET' },
    ), */
    promise: request(`/items/?category_id=${categoryId}`, { method: 'GET' }),
  });
};

export const addItem = () => { };
export const editItem = () => { };

export const deleteItemAndRefetch = () => (dispatch) => { };
