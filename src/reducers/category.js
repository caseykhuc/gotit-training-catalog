import { categoryTypes } from '../constants/actionTypes';
import { arrayToObject } from '../utils/utils';

/* const initialState = {
  byId: {
    21: {
      id: 21,
      name: 'category name',
      description: 'category description',
      created: '2015-08-05T08:40:51.620Z',
      updated: '2018-04-03T08:40:51.620Z',
    },
    22: {
      id: 22,
      name: 'category name',
      description: 'category description',
      created: '2015-08-05T08:40:51.620Z',
      updated: '2018-04-03T08:40:51.620Z',
    },
  },
  isLoading: false,
  error: '',
}; */

const initialState = {
  byId: {},
  isLoading: false,
  error: '',
};

const categoryReducer = (state = initialState, action) => {
  switch (action.type) {
    case categoryTypes.FETCH_CATEGORY_REQUEST:
      return { ...state, isLoading: true };

    case categoryTypes.FETCH_CATEGORY_SUCCESS:
      return {
        ...state,
        isLoading: false,
        byId: arrayToObject(action.payload),
      };

    case categoryTypes.FETCH_CATEGORY_FAILURE:
      return { ...state, isLoading: false, error: action.payload };

    default:
      return state;
  }
};

export default categoryReducer;

export const getCategories = (state) => {
  return getCategoryIds(state).map((id) => state.byId[id]);
};

export const getCategoryIds = (state) => Object.keys(state.byId);
