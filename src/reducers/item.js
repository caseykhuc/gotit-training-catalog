import { combineReducers } from 'redux';
import { itemTypes } from 'constants/actionTypes';
import { arrayToObject } from 'utils';

/** store items in the current page
 * or about a single item itself
*/
const byId = (state = {}, action) => {
  switch (action.type) {
    case itemTypes.FETCH_ITEMS_SUCCESS:
      return arrayToObject(action.payload.items);
    case itemTypes.FETCH_ITEM_SUCCESS:
      return { ...state, [action.payload.id]: action.payload };
    case itemTypes.EDIT_ITEM_SUCCESS:
      return { ...state, [action.payload.id]: action.payload };
    /** do not modify state here because
     * deleted/added item required refetch items
    case itemTypes.DELETE_ITEM_SUCCESS:
    case itemTypes.ADD_ITEM_SUCCESS:
      return state;
      */
    default:
      return state;
  }
};

const isLoading = (state = false, action) => {
  switch (action.type) {
    case itemTypes.ADD_ITEM_REQUEST:
    case itemTypes.DELETE_ITEM_REQUEST:
    case itemTypes.EDIT_ITEM_REQUEST:
    case itemTypes.FETCH_ITEMS_REQUEST:
    case itemTypes.FETCH_ITEM_REQUEST:
      return true;

    case itemTypes.ADD_ITEM_SUCCESS:
    case itemTypes.DELETE_ITEM_SUCCESS:
    case itemTypes.EDIT_ITEM_SUCCESS:
    case itemTypes.FETCH_ITEMS_SUCCESS:
    case itemTypes.FETCH_ITEM_SUCCESS:
    case itemTypes.ADD_ITEM_FAILURE:
    case itemTypes.DELETE_ITEM_FAILURE:
    case itemTypes.EDIT_ITEM_FAILURE:
    case itemTypes.FETCH_ITEMS_FAILURE:
    case itemTypes.FETCH_ITEM_FAILURE:
      return false;

    default:
      return state;
  }
};

const error = (state = '', action) => {
  switch (action.type) {
    case itemTypes.ADD_ITEM_FAILURE:
    case itemTypes.EDIT_ITEM_FAILURE:
    case itemTypes.DELETE_ITEM_FAILURE:
    case itemTypes.FETCH_ITEMS_FAILURE:
    case itemTypes.FETCH_ITEM_FAILURE:
      return action.payload;
    case itemTypes.ADD_ITEM_REQUEST:
    case itemTypes.DELETE_ITEM_REQUEST:
    case itemTypes.EDIT_ITEM_REQUEST:
    case itemTypes.FETCH_ITEMS_REQUEST:
    case itemTypes.FETCH_ITEM_REQUEST:
    case itemTypes.ADD_ITEM_SUCCESS:
    case itemTypes.EDIT_ITEM_SUCCESS:
    case itemTypes.FETCH_ITEMS_SUCCESS:
    case itemTypes.FETCH_ITEM_SUCCESS:
      return '';
    default:
      return state;
  }
};

// totalItems in current category
const totalItems = (state = 0, action) => {
  switch (action.type) {
    case itemTypes.FETCH_ITEMS_SUCCESS:
      return action.payload.totalItems;
    case itemTypes.ADD_ITEM_SUCCESS:
      return state + 1;
    case itemTypes.DELETE_ITEM_SUCCESS:
      return state - 1;
    default:
      return state;
  }
};

const page = (state = 0, action) => {
  switch (action.type) {
    case itemTypes.FETCH_ITEMS_SUCCESS:
      return action.payload.page;
    default:
      return state;
  }
}

export default combineReducers({
  byId, totalItems, isLoading, error, page,
});

export const getItem = (state, id) => state.byId[id];

export const getItems = (state) => (state.byId
  ? Object.keys(state.byId).map((id) => state.byId[id])
  : {});
