import { userTypes } from 'constants/actionTypes';
import * as userActions from '../user';

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
  it('should create register success action', async () => {
    fetch.mockResponse(JSON.stringify(response));
    creator = userActions.registerUser(body);
    await setup();

    expect(actions[1]).toEqual({ type: userTypes.REGISTER_USER_SUCCESS, payload: 'test' });
  });

  it('should create register failure action when caught error', async () => {
    fetch.mockReject(JSON.stringify(response));
    creator = userActions.registerUser(body);
    await setup();

    expect(actions[1]).toEqual({ type: userTypes.REGISTER_USER_FAILURE });
  });

  // sign in user
  it('should create sign in success action', async () => {
    fetch.mockResponse(JSON.stringify(response));
    creator = userActions.signInUser();
    await setup();

    expect(actions[1]).toEqual({ type: userTypes.SIGN_IN_USER_SUCCESS, payload: 'test' });
  });

  it('should create sign in failure action when caught error', async () => {
    fetch.mockReject(JSON.stringify(response));
    creator = userActions.signInUser();
    await setup();

    expect(actions[1]).toEqual({ type: userTypes.SIGN_IN_USER_FAILURE });
  });

  // signout user
});
