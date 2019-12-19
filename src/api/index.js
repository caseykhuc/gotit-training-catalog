import { BASE_URL, ITEM_PER_PAGE } from '../config';

const handleJson = (res) => {
  if (res.ok) { return res.json(); }
  throw res.json();
}

const request = (url = '', method = 'GET', body) => {
  const req = ((method !== 'GET' && body) ? fetch(`${BASE_URL}/${url}`, {
    method,
    body: JSON.stringify(body),
  }) : fetch(`${BASE_URL}/${url}`))
  return req.then(handleJson);
}

export const fetchCategories = () => request('categories?offset=0&limit=100')
  .then((res) => res.categories);

export const fetchItems = (categoryId, page) => request(`categories/${categoryId}/items?offset=${page * ITEM_PER_PAGE}&limit=${ITEM_PER_PAGE}`)
  .then((res) => res.items)

export const registerUser = (body) => request('registrations', 'POST', body)
  .then((res) => res.access_token);

export const signinUser = (body) => request('login', 'POST', body)
  .then((res) => res.access_token);
