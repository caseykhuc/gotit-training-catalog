import configureStore from 'redux-mock-store';
import handleFetch from '../../middlewares/handleFetch';
import * as categoryActions from '../category';
import { categoryTypes } from '../../constants/actionTypes';


const middlewares = [handleFetch];
const mockStore = configureStore(middlewares);

describe('actions/category', () => {
  const store = mockStore({});
  let response;
  let creator;
  let actions;

  const setup = async () => {
    store.clearActions();
    await store.dispatch(creator);
    actions = store.getActions();
  }

  beforeEach(() => {
    response = {
      categories: [{ name: 'test' }],
    };
  });

  it('should create success action', async () => {
    fetch.mockResponse(JSON.stringify(response));
    creator = categoryActions.fetchCategory();
    await setup();

    expect(actions[1]).toEqual({ type: categoryTypes.FETCH_CATEGORY_SUCCESS, payload: [{ name: 'test' }] });
  });

  it('should create failure action when caught error', async () => {
    fetch.mockReject(JSON.stringify(response));
    creator = categoryActions.fetchCategory();
    await setup();

    expect(actions[1]).toEqual({ type: categoryTypes.FETCH_CATEGORY_FAILURE });
  })
});
