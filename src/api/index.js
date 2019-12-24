import { BASE_URL, ITEM_PER_PAGE } from '../config';

// helpers
const handleJson = (res) => {
  if (res.ok) { return res.json(); }
  throw res.json();
}

const request = (url = '', method = 'GET', body) => {
  const req = ((method !== 'GET' && body) ? fetch(`${BASE_URL}/${url}`, {
    method,
    body: JSON.stringify(body),
    headers: {
      'Content-Type': 'application/json',
    },
  }) : fetch(`${BASE_URL}/${url}`))
  return req.then(handleJson);
}

const authorizedRequest = (url = '', method = 'GET', body) => {
  const req = (body)
    ? fetch(`${BASE_URL}/${url}`, {
      method,
      body: JSON.stringify(body),
      headers: {
        Authorization: `Bearer ${localStorage.getItem('access_token')}`,
        'Content-Type': 'application/json',
      },
    })
    : fetch(`${BASE_URL}/${url}`, {
      method,
      headers: {
        Authorization: `Bearer ${localStorage.getItem('access_token')}`,
        'Content-Type': 'application/json',
      },
    })
  return req.then(handleJson);
}

// regular requests
export const fetchCategories = () => request('categories?offset=0&limit=100')
  .then((res) => res.categories);

export const fetchItems = (categoryId, page) => request(`categories/${categoryId}/items?offset=${page * ITEM_PER_PAGE}&limit=${ITEM_PER_PAGE}`)
  .then((res) => res)

export const fetchItem = (categoryId, itemId) => request(`categories/${categoryId}/items/${itemId}`)
  .then((res) => res)

// authorized requests
export const fetchUser = () => fetch(`${BASE_URL}/me`, {
  headers: {
    Authorization: `Bearer ${localStorage.getItem('access_token')}`,
    'Content-Type': 'application/json',
  },
}).then(handleJson)
  .then((res) => res.id);

export const registerUser = (body) => request('registrations', 'POST', body)
  .then((res) => res.access_token);

export const signinUser = (body) => request('login', 'POST', body)
  .then((res) => res.access_token);

export const addItem = (categoryId, body) => authorizedRequest(`categories/${categoryId}/items`, 'POST', body)
  .then((res) => { console.log(res); return res });

export const deleteItem = (categoryId, itemId) => authorizedRequest(`categories/${categoryId}/items/${itemId}`, 'DELETE')
  .then((res) => res);
