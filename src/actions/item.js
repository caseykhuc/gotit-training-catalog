import { itemTypes } from 'constants/actionTypes';
import * as api from 'utils/api';

export const fetchItems = (categoryId, page = 0) => ({
  type: itemTypes.FETCH_ITEMS,
  promise: api.fetchItems(categoryId, page)
    .then((res) => ({ ...res, page })),
})

export const fetchItem = (categoryId, itemId) => ({
  type: itemTypes.FETCH_ITEM,
  promise: api.fetchItem(categoryId, itemId),
})

export const addItem = ({
  name, description, price, categoryId,
}) => ({
  type: itemTypes.ADD_ITEM,
  promise: api.addItem(categoryId, { name, description, price }),
});

export const editItem = (categoryId, itemId) => (body) => ({
  type: itemTypes.EDIT_ITEM,
  promise: api.editItem(categoryId, itemId, body),
});

export const deleteItem = (categoryId, itemId) => ({
  type: itemTypes.DELETE_ITEM,
  promise: api.deleteItem(categoryId, itemId),
});
