import { combineReducers } from 'redux';
import category from './categoryReducer';
import item from './itemReducer';
import user from './userReducer';

const reducer = combineReducers({user, item, category});

export default reducer;
