import handleFetch from '../handleFetch';

describe('middlewares/handleFetch', () => {
  const create = () => {
    const store = {
      getState: jest.fn(() => { }),
      dispatch: jest.fn(),
    }
    const next = jest.fn();
    const invoke = async (action) => handleFetch(store)(next)(action);

    return { store, next, invoke }
  }

  const { store, next, invoke } = create();

  it('should pass dispatch and getState when get function action', () => {
    const action = (dispatch, getState) => { dispatch({ type: 'COOL_ACTION' }); getState(); }
    invoke(action);

    expect(store.dispatch).toHaveBeenLastCalledWith({ type: 'COOL_ACTION' });
    expect(store.getState).toHaveBeenCalled();
  });
  it('should pass through action with no promise', () => {
    const action = { type: 'COOL_ACTION', payload: 'data' };
    invoke(action);

    expect(next).toHaveBeenCalledWith(action);
  });
  it('should dispatch success action when done await', async () => {
    const action = { type: 'COOL_ACTION', promise: Promise.resolve('meow') };
    await invoke(action);

    expect(store.dispatch).toHaveBeenCalledWith({ type: 'COOL_ACTION_SUCCESS', payload: 'meow' })
  });
  it('should dispatch failure action when caught error', async () => {
    const action = { type: 'COOL_ACTION', promise: Promise.reject(new Error('meow')) };
    await invoke(action);

    expect(store.dispatch).toHaveBeenCalledWith({ type: 'COOL_ACTION_FAILURE', payload: 'meow' })
  })
})
