import { userTypes } from 'constants/actionTypes';
import reducer from '../user';

describe('reducers/user', () => {
  let state;
  beforeEach(() => {
    state = {
      userId: null,
      isLoading: true,
      error: '',
    };
  });
  it('should handle SUCCESS', () => {
    const action = {
      type: userTypes.FETCH_USER_SUCCESS,
      payload: '12345',
    };
    expect(reducer(state, action).userId).toEqual('12345');
    expect(reducer(state, action).isLoading).toBeFalsy();
  });
  it('should handle REQUEST', () => {
    let action = {
      type: userTypes.FETCH_USER_REQUEST,
    }
    state.isLoading = false;
    expect(reducer(state, action).isLoading).toBeTruthy();

    action = { type: userTypes.REGISTER_USER_REQUEST }
    expect(reducer(state, action).isLoading).toBeTruthy();
  });
  it('should handle FAILURE', () => {
    const action = {
      type: userTypes.SIGNIN_USER_FAILURE,
      payload: 'Not found',
    }
    expect(reducer(state, action)).toEqual({
      userId: null,
      isLoading: false,
      error: 'Not found',
    });
  });
  it('should handle SIGN OUT', () => {
    const action = {
      type: userTypes.SIGNOUT_USER,
      payload: '12345',
    };
    expect(reducer(state, action)).toEqual({
      userId: null,
      isLoading: false,
      error: '',
    })
  });
});
