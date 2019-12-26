import { itemTypes } from 'constants/actionTypes';
import * as itemActions from '../item';

describe('actions/item', () => {
  const store = global.mockStore;
  let response;
  let body;
  let creator;
  let actions;

  const setup = async () => {
    store.clearActions();
    await store.dispatch(creator);
    actions = store.getActions();
  }

  beforeEach(() => {
    response = {};
    body = {};
  });

  // fetchItem
  it('should create fetchItem REQUEST action', async () => {
    fetch.mockResponse(JSON.stringify(response));
    creator = itemActions.fetchItem();
    await setup();

    expect(actions[0].type).toEqual(itemTypes.FETCH_ITEM_REQUEST);
  });

  // fetchItems
  it('should create fetchItems REQUEST action', async () => {
    fetch.mockResponse(JSON.stringify(response));
    creator = itemActions.fetchItems();
    await setup();

    expect(actions[0].type).toEqual(itemTypes.FETCH_ITEMS_REQUEST);
  });

  // addItem
  it('should create addItem REQUEST action', async () => {
    fetch.mockResponse(JSON.stringify(response));
    body = {
      name: '', description: '', price: '', categoryId: '', itemId: '',
    }
    creator = itemActions.addItem(body);
    await setup();

    expect(actions[0].type).toEqual(itemTypes.ADD_ITEM_REQUEST);
  });

  // editItem
  it('should create editItem REQUEST action', async () => {
    fetch.mockResponse(JSON.stringify(response));
    body = {
      name: '', description: '', price: '', categoryId: '', itemId: '',
    }
    creator = itemActions.editItem()(body);
    await setup();

    expect(actions[0].type).toEqual(itemTypes.EDIT_ITEM_REQUEST);
  });

  // deleteItem
  it('should create deleteItem REQUEST action', async () => {
    fetch.mockResponse(JSON.stringify(response));
    creator = itemActions.deleteItem();
    await setup();

    expect(actions[0].type).toEqual(itemTypes.DELETE_ITEM_REQUEST);
  });
});
