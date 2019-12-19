import * as userActions from '../user';
import { userTypes } from '../../constants/actionTypes';

describe('actions/user', () => {
  const store = global.mockStore;
  let response;
  let creator;
  let actions;
  let body;

  const setup = async () => {
    store.clearActions();
    await store.dispatch(creator);
    actions = store.getActions();
  }

  beforeEach(() => {
    response = {
      access_token: 'test',
    };
    body = {
      username: 'username',
      email: 'email',
      name: 'name',
      password: 'password',
    }
  });

  // register user
  it('should create success action', async () => {
    fetch.mockResponse(JSON.stringify(response));
    creator = userActions.registerUser(body);
    await setup();

    expect(actions[1]).toEqual({ type: userTypes.REGISTER_USER_SUCCESS, payload: 'test' });
  });

  it('should create failure action when caught error', async () => {
    fetch.mockReject(JSON.stringify(response));
    creator = userActions.registerUser(body);
    await setup();

    expect(actions[1]).toEqual({ type: userTypes.REGISTER_USER_FAILURE });
  });

  // signin user
  it('should create success action', async () => {
    fetch.mockResponse(JSON.stringify(response));
    creator = userActions.signinUser();
    await setup();

    expect(actions[1]).toEqual({ type: userTypes.SIGNIN_USER_SUCCESS, payload: 'test' });
  });

  it('should create failure action when caught error', async () => {
    fetch.mockReject(JSON.stringify(response));
    creator = userActions.signinUser();
    await setup();

    expect(actions[1]).toEqual({ type: userTypes.SIGNIN_USER_FAILURE });
  });

  // signout user
});
