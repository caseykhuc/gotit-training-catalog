import { categoryTypes } from 'constants/actionTypes';
import { arrayToObject } from 'utils/utils';

const initialState = {
  byId: {},
  isLoading: false,
  error: '',
};

export default (state = initialState, action) => {
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

export const getCategoryIds = (state) => Object.keys(state.byId);

export const getCategories = (state) => getCategoryIds(state).map((id) => state.byId[id]);
