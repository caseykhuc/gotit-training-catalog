import { createStore, applyMiddleware, compose } from 'redux';
import { createLogger } from 'redux-logger';
import handleFetch from 'middlewares/handleFetch';
import handleJwt from 'middlewares/handleJwt';
import rootReducer from 'reducers';

const configureStore = () => {
  const middlewares = [handleFetch, handleJwt];
  // console.log(thunk);
  // const middlewares = [];
  if (process.env.NODE_ENV !== 'production') {
    middlewares.push(createLogger());
  }

  const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
  return createStore(
    rootReducer,
    /* preloadedState, */
    composeEnhancers(applyMiddleware(...middlewares)),
  );
};

export default configureStore;
