// get() is one of our utilities for creating GET API calls
/*

*/

// thunk

const thunk = (store) => (next) => async (action) => {
  // console.log(action);
  // console.log(action.hasOwnProperty('promise'));

  if (typeof action === 'function') {
    return action(store.dispatch, store.getState);
  } else if (action.hasOwnProperty('promise')) {
    console.log('REQUEST//SUCCESS//FAILURE PATTERN');
    store.dispatch({ type: action.type });
    try {
      const result = await action.promise;
      // return middleware result
      console.log(result);
      if (result.status >= 200 && result.status < 300) {
        const data = await result.json();
        store.dispatch({ type: `${action.type}_SUCCESS`, payload: data });
        return {
          success: true,
          data,
        };
      } else throw new Error(result.statusText);
    } catch (e) {
      store.dispatch({ type: `${action.type}_FAILURE`, payload: e.message });
      // return middleware result
      return {
        success: false,
        error: e,
      };
    }
  } else {
    return next(action);
  }
};

export default thunk;
