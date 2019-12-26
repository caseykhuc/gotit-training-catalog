import camelcaseKeys from 'camelcase-keys';
import config from 'configuration';

const { BASE_URL, ITEM_PER_PAGE } = config;

// helpers
const handleJson = (res) => {
  if (res.ok) {
    return (res.json())
      .then((res) => camelcaseKeys(res, { deep: true }));
  }
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

export const fetchItems = (categoryId, page) => request(`categories/${categoryId}/items?offset=${page * ITEM_PER_PAGE}&limit=${ITEM_PER_PAGE}`)

export const fetchItem = (categoryId, itemId) => request(`categories/${categoryId}/items/${itemId}`)

export const registerUser = (body) => request('registrations', 'POST', body)
  .then((res) => res.accessToken);

export const signinUser = (body) => request('login', 'POST', body)
  .then((res) => res.accessToken);

// authorized requests
export const fetchUser = () => authorizedRequest('me')
  .then((res) => res.id);

export const addItem = (categoryId, body) => authorizedRequest(`categories/${categoryId}/items`, 'POST', body)

export const editItem = (categoryId, itemId, body) => authorizedRequest(`categories/${categoryId}/items/${itemId}`, 'PUT', body)

export const deleteItem = (categoryId, itemId) => authorizedRequest(`categories/${categoryId}/items/${itemId}`, 'DELETE')
