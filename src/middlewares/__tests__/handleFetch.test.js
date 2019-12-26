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
    const action = (dispatch, getState) => { dispatch({ type: 'SAMPLE_ACTION' }); getState(); }
    invoke(action);

    expect(store.dispatch).toHaveBeenLastCalledWith({ type: 'SAMPLE_ACTION' });
    expect(store.getState).toHaveBeenCalled();
  });
  it('should pass through action with no promise', () => {
    const action = { type: 'SAMPLE_ACTION', payload: 'data' };
    invoke(action);

    expect(next).toHaveBeenCalledWith(action);
  });
  it('should throw error when status_code response is unsuccessful', async () => {
    const action = { type: 'SAMPLE_ACTION', promise: Promise.resolve({ statusCode: 400 }) };

    await invoke(action);
    expect(store.dispatch).toHaveBeenCalledWith({ type: 'SAMPLE_ACTION_FAILURE', payload: 'Request failed' });
  });
  it('should dispatch success action when done await', async () => {
    const action = { type: 'SAMPLE_ACTION', promise: Promise.resolve('test') };
    await invoke(action);

    expect(store.dispatch).toHaveBeenCalledWith({ type: 'SAMPLE_ACTION_SUCCESS', payload: 'test' })
  });
  it('should dispatch failure action when caught error', async () => {
    const action = { type: 'SAMPLE_ACTION', promise: Promise.reject(new Error('test')) };
    await invoke(action);

    expect(store.dispatch).toHaveBeenCalledWith({ type: 'SAMPLE_ACTION_FAILURE', payload: 'test' })
  })
})
