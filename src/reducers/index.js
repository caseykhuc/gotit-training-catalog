import { combineReducers } from 'redux';
import category from './categoryReducer';
import item from './itemReducer';
import user from './userReducer';
import modal from './modalReducer';

const reducer = combineReducers({ user, item, category, modal });

export default reducer;
