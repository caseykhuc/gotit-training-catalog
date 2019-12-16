import { combineReducers } from 'redux';
import category, * as fromCategory from './categoryReducer';
import item, * as fromItem from './itemReducer';
import user from './userReducer';
import modal from './modalReducer';
import 'bootstrap/dist/css/bootstrap.min.css';

const reducer = combineReducers({ user, item, category, modal });

export default reducer;

export const getCategories = (state) =>
  fromCategory.getCategories(state.category);

export const getCategoryIds = (state) =>
  fromCategory.getCategoryIds(state.category);

export const getItems = (state) => fromItem.getItems(state.item);
