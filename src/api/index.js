import { baseURL, ITEM_PER_PAGE } from './config';

export const request = (path, options = {}) => fetch(`${baseURL}${path}`, { ...options });
export const fetchCategories = () => fetch(`${baseURL}/categories?offset=0&limit=100`)
  .then((res) => {
    if (res.ok) { return res.json(); }
    throw res.json();
  })
  .then((res) => res.categories);

export const fetchItems = (categoryId, page) => fetch(`${baseURL}/categories/${categoryId}/items?offset=${page * ITEM_PER_PAGE}&limit=${ITEM_PER_PAGE}`)
  .then((res) => {
    if (res.ok) { return res.json(); }
    throw res.json();
  })
  .then((res) => res.items);
