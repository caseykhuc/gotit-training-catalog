import reducer from '../category';
import { categoryTypes } from '../../constants/actionTypes';

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
