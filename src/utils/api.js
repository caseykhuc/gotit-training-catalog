import camelcaseKeys from 'camelcase-keys';
import config from 'configuration';
import requestMethod from 'constants/requestMethods';
import _ from 'lodash';

const { BASE_URL, ITEM_PER_PAGE } = config;

// helpers
const handleJson = (res) => {
  if (res.ok) {
    return (res.json())
      .then((res) => camelcaseKeys(res, { deep: true }));
  }
  throw res.json();
}

const requestFromMethod = (method) => (url = '', body) => fetch(`${BASE_URL}/${url}`, {
  method,
  body: (body ? JSON.stringify(body) : undefined),
  headers: {
    Authorization: `Bearer ${localStorage.getItem('access_token')}`,
    'Content-Type': 'application/json',
  },
}).then(handleJson)

const request = _.mapValues(requestMethod, (value) => requestFromMethod(value));

// regular requests
export const fetchCategories = () => request.GET('categories?offset=0&limit=100')

export const fetchItems = (categoryId, page) => request.GET(
  `categories/${categoryId}/items?offset=${page * ITEM_PER_PAGE}&limit=${ITEM_PER_PAGE}`,
)

export const fetchItem = (categoryId, itemId) => request.GET(
  `categories/${categoryId}/items/${itemId}`,
)

export const registerUser = (body) => request.POST('registrations', body)

export const signInUser = (body) => request.POST('login', body)

// authorized requests
export const fetchUser = () => request.GET('me')

export const addItem = (categoryId, body) => request.POST(
  `categories/${categoryId}/items`, body,
)

export const editItem = (categoryId, itemId, body) => request.PUT(
  `categories/${categoryId}/items/${itemId}`, body,
)

export const deleteItem = (categoryId, itemId) => request.DELETE(
  `categories/${categoryId}/items/${itemId}`,
)
