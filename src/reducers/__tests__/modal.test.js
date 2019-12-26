import { modalTypes } from 'constants/actionTypes';
import reducer from '../modal';

describe('reducers/modal', () => {
  let state;
  beforeEach(() => {
    state = {
      current: null,
      props: {},
    };
  });
  it('should handle SHOW_MODAL', () => {
    const action = {
      type: modalTypes.SHOW_MODAL,
      payload: {
        modalKey: 'SAMPLE KEY',
        props: 'SAMPLE PROPS',
      },
    };
    expect(reducer(state, action)).toEqual({
      current: 'SAMPLE KEY',
      props: 'SAMPLE PROPS',
    })
  });
  it('should handle HIDE_MODAL', () => {
    const action = {
      type: modalTypes.HIDE_MODAL,
      payload: {
        modalKey: 'SAMPLE KEY',
        props: 'SAMPLE PROPS',
      },
    };
    expect(reducer(state, action)).toEqual({
      current: null,
      props: {},
    })
  });
});
