import { combineReducers } from 'redux';
import category, * as fromCategory from './categoryReducer';
import item from './itemReducer';
import user from './userReducer';
import modal from './modalReducer';
import 'bootstrap/dist/css/bootstrap.min.css';

const reducer = combineReducers({ user, item, category, modal });

export default reducer;

export const getCategories = (state) =>
  fromCategory.getCategories(state.category);
