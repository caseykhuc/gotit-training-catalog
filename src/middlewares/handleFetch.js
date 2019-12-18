// get() is one of our utilities for creating GET API calls
/*

*/

// thunk

const thunk = (store) => (next) => async (action) => {
  if (typeof action === 'function') {
    return action(store.dispatch, store.getState);
  }
  if (!Object.prototype.hasOwnProperty.call(action, 'promise')) return next(action);

  // console.log('REQUEST//SUCCESS//FAILURE PATTERN');
  store.dispatch({ type: `${action.type}_REQUEST` });
  try {
    const result = await action.promise;
    /* console.log(action);
    console.log(result); */
    // return middleware result
    store.dispatch({ type: `${action.type}_SUCCESS`, payload: result });
    return {
      success: true,
      result,
    };
  } catch (e) {
    const { message } = await e;

    store.dispatch({ type: `${action.type}_FAILURE`, payload: message });
    // if e is array => only take the first element
    // return middleware result
    return {
      success: false,
      message,
    };
  }
};

export default thunk;
