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

export const fetchItem = (categoryId, itemId) => ({
  type: itemTypes.FETCH_ITEM,
  promise: api.fetchItem(categoryId, itemId),
})

export const addItem = ({
  name, description, price, category_id,
}) => ({
  type: itemTypes.ADD_ITEM,
  promise: api.addItem(category_id, { name, description, price }),
});

export const editItem = () => { };

export const deleteItem = (categoryId, itemId) => ({
  type: itemTypes.DELETE_ITEM,
  promise: api.deleteItem(categoryId, itemId),
});
