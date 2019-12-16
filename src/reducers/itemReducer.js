import actionTypes from '../actions/types';

const initialState = {
  byId: {
    4: {
      id: 4,
      name: 'item name 1',
      description: 'item description 1',
      price: 30.5,
      user_id: 4,
      category_id: 2,
      created: '2015-08-05T08:40:51.620Z',
      updated: '2018-04-03T08:40:51.620Z',
    },
    8: {
      id: 8,
      name: 'item name 2',
      description: 'item description 2',
      price: 32.7,
      user_id: 18,
      category_id: 2,
      created: '2015-08-05T08:40:51.620Z',
      updated: '2018-04-03T08:40:51.620Z',
    },
  },
  allIds: [4, 8],
  totalItems: 100,
};

const itemReducer = (state, action) => {
  switch (action.type) {
    default:
      return state;
    /* case actionTypes. */
  }
};

export default itemReducer;
