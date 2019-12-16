import actionTypes from '../actions/types';

const initialState = {
  byId: {
    21: {
      id: 21,
      name: 'category name',
      description: 'category description',
      created: '2015-08-05T08:40:51.620Z',
      updated: '2018-04-03T08:40:51.620Z',
    },
    22: {
      id: 22,
      name: 'category name',
      description: 'category description',
      created: '2015-08-05T08:40:51.620Z',
      updated: '2018-04-03T08:40:51.620Z',
    },
  },
  allIds: [21, 22],
  totalCategories: 100
};

const categoryReducer = (state, action) => {
  switch (action.type) {
    default:
      return state;
    /* case actionTypes. */
  }
};

export default categoryReducer;
