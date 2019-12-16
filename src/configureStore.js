import { createStore, applyMiddleware } from 'redux';
import { createLogger } from 'redux-logger';
import handleFetch from './middlewares/handleFetch';
import rootReducer from './reducers';

const configureStore = () => {
  const middlewares = [handleFetch];
  //console.log(thunk);
  //const middlewares = [];
  if (process.env.NODE_ENV !== 'production') {
    middlewares.push(createLogger());
  }

  return createStore(rootReducer, applyMiddleware(...middlewares));
};

export default configureStore;
