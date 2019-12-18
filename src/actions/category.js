import { categoryTypes } from '../constants/actionTypes';
import * as api from '../api';

// eslint-disable-next-line import/prefer-default-export
export const fetchCategory = () => ({
  type: categoryTypes.FETCH_CATEGORY,
  promise: api.fetchCategories(),
})
