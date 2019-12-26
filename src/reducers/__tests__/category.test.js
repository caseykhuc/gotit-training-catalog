import { categoryTypes } from 'constants/actionTypes';
import reducer, * as selector from '../category';

describe('reducers/category', () => {
  let state;
  beforeEach(() => {
    state = {
      byId: {},
      isLoading: false,
      error: '',
    };
  });
  it('should handle FETCH_CATEGORY_REQUEST', () => {
    const action = {
      type: categoryTypes.FETCH_CATEGORY_REQUEST,
    };
    expect(reducer(state, action)).toEqual({ byId: {}, isLoading: true, error: '' })
  });
  it('should handle FETCH_CATEGORY_SUCCESS', () => {
    const action = {
      type: categoryTypes.FETCH_CATEGORY_SUCCESS,
      payload: [{ id: '1' }, { id: '2' }],
    }
    state.isLoading = true;
    expect(reducer(state, action)).toEqual({
      byId: {
        1: { id: '1' }, 2: { id: '2' },
      },
      isLoading: false,
      error: '',
    })
  });
  it('should handle FETCH_CATEGORY_FAILURE', () => {
    const action = {
      type: categoryTypes.FETCH_CATEGORY_FAILURE,
      payload: 'Not found',
    }
    state.isLoading = true;
    expect(reducer(state, action)).toEqual({
      byId: {},
      isLoading: false,
      error: 'Not found',
    })
  });
});

describe('reducers/category (selectors)', () => {
  let state;
  beforeEach(() => {
    state = {
      byId: {
        1: { id: '1' }, 2: { id: '2' },
      },
      isLoading: false,
      error: '',
    };
  });
  // getCategoryIds
  it('should return arrays of ids', () => {
    expect(selector.getCategoryIds(state)).toEqual(['1', '2']);
  });
  // getCategories
  it('should return arrays of category', () => {
    expect(selector.getCategories(state)).toEqual(
      [{ id: '1' }, { id: '2' }],
    );
  });
});
