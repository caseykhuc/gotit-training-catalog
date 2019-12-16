import React from 'react';
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';

const CategoryDetails = ({ category }) => {
  return <div>CategoryDetails {category ? category.name : ''}</div>;
};

const mapStateToProps = (state, { match }) => {
  console.log(match);
  return {
    category: Object.assign(state.category)[match.params.categoryId],
  };
};

export default withRouter(connect(mapStateToProps)(CategoryDetails));
