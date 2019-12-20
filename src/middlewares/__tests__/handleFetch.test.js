import handleJwt from '../handleJwt';
import { userTypes } from '../../constants/actionTypes';

describe('middlewares/handleJwt', () => {
  const create = () => {
    const store = {
      getState: jest.fn(() => { }),
      dispatch: jest.fn(),
    }
    const next = jest.fn();
    const invoke = async (action) => handleJwt(store)(next)(action);

    return { store, next, invoke }
  }

  const { store, next, invoke } = create();

  beforeEach(() => {
    localStorage.clear();
  })

  it('should store token on localStorage in signin/register success', () => {
    let action = { type: userTypes.SIGNIN_USER_SUCCESS, payload: 'sample access_token' };
    invoke(action);

    expect(localStorage.getItem('access_token')).toBe('sample access_token');

    action = { type: userTypes.REGISTER_USER_SUCCESS, payload: 'test access_token' };
    invoke(action);

    expect(localStorage.getItem('access_token')).toBe('test access_token');
  });
  it('should clear token on localStorage in signout action', () => {
    const action = { type: userTypes.SIGNOUT_USER, payload: 'sample access_token' };
    invoke(action);

    expect(localStorage.getItem('access_token')).toBeFalsy();
  });
  it('should pass action when action is of other type', () => {
    const action = { type: userTypes.FETCH_USER, payload: 'sample access_token' };
    invoke(action);

    expect(next).toHaveBeenCalledWith(action);
  })
})
