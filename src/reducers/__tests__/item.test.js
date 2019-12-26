import { itemTypes } from 'constants/actionTypes';
import { arrayToObject } from 'utils/utils';
import reducer, * as selector from '../item';

describe('reducers/item', () => {
  let state;
  let newState;
  let action;
  const setup = () => {
    newState = reducer(state, action);
  }
  beforeEach(() => {
    state = {
      byId: {},
      isLoading: false,
      error: '',
      totalItems: 0,
      page: 0,
    };
  });
  it('should handle FETCH_ITEMS_SUCCESS', () => {
    action = {
      type: itemTypes.FETCH_ITEMS_SUCCESS,
      payload: {
        items: [{ id: 1 }, { id: 2 }],
        totalItems: 10,
        page: 1,
      },
    };
    setup();
    expect(newState.byId).toEqual(arrayToObject(action.payload.items));
    expect(newState.totalItems).toBe(10);
    expect(newState.page).toBe(1);
  });
  it('should handle FETCH_ITEM_SUCCESS', () => {
    action = {
      type: itemTypes.FETCH_ITEM_SUCCESS,
      payload: { id: 1 },
    };
    setup();
    expect(newState.byId['1']).toEqual(action.payload);
  });
  it('should handle EDIT_ITEM_SUCCESS', () => {
    action = {
      type: itemTypes.EDIT_ITEM_SUCCESS,
      payload: { id: 1 },
    };
    setup();
    expect(newState.byId['1']).toEqual(action.payload);
  });
  it('shoul handle ADD_ITEM_SUCCESS', () => {
    action = { type: itemTypes.ADD_ITEM_SUCCESS }
    setup();
    expect(newState.totalItems).toBe(state.totalItems + 1);
  });
  it('shoul handle DELETE_ITEM_SUCCESS', () => {
    action = { type: itemTypes.DELETE_ITEM_SUCCESS }
    setup();
    expect(newState.totalItems).toBe(state.totalItems - 1);
  })
  it('should handle REQUEST', () => {
    action = { type: itemTypes.FETCH_ITEM_REQUEST }
    setup();
    expect(newState.isLoading).toBeTruthy();

    action = { type: itemTypes.ADD_ITEM_REQUEST }
    expect(reducer(state, action).isLoading).toBeTruthy();
  });
  it('should handle FAILURE', () => {
    state.isLoading = true;
    action = {
      type: itemTypes.DELETE_ITEM_FAILURE,
      payload: 'Not found',
    }
    setup();
    expect(newState.isLoading).toBeFalsy();
    expect(newState.error).toBe('Not found');
  });
});

describe('reducers/item (selectors)', () => {
  let state;
  beforeEach(() => {
    state = {
      byId: {
        1: { id: '1' }, 2: { id: '2' },
      },
    };
  });
  // getCategories
  it('should return arrays of category', () => {
    expect(selector.getItems(state)).toEqual(
      [{ id: '1' }, { id: '2' }],
    );
  });
});
