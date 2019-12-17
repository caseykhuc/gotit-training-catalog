import { combineReducers } from 'redux';
import category, * as fromCategory from './category';
import item, * as fromItem from './item';
import user from './user';
import modal from './modal';
import 'bootstrap/dist/css/bootstrap.min.css';

const reducer = combineReducers({ user, item, category, modal });

export default reducer;

export const getCategories = (state) =>
  fromCategory.getCategories(state.category);

export const getCategoryIds = (state) =>
  fromCategory.getCategoryIds(state.category);

export const getItems = (state) => fromItem.getItems(state.item);
