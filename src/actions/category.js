import { categoryTypes } from 'constants/actionTypes';
import * as api from 'utils/api';

// eslint-disable-next-line import/prefer-default-export
export const fetchCategory = () => ({
  type: categoryTypes.FETCH_CATEGORY,
  promise: api.fetchCategories()
    .then((res) => res.categories),
})
