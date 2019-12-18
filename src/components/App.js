/* eslint-disable import/no-named-as-default */
import React from 'react';
import { Route, Switch, Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import { Container } from 'react-bootstrap'
import PropTypes from 'prop-types';
import Header from './Header';

import { fetchCategory } from '../actions/category';
import { getCategories } from '../reducers';

import CategoryContainer from './Category/CategoryContainer';
import CategoryList from './Category/CategoryList';
import ItemNew from './Item/ItemNew';
import ModalContainer from './ModalContainer';


export class App extends React.Component {
  componentDidMount() {
    const { fetchCategory } = this.props;
    fetchCategory();
  }

  render() {
    const { categories } = this.props;

    return (
      <Container className="App">
        <Header />
        <CategoryList categories={categories} />
        <Switch>
          <Route path="/new-item" component={ItemNew} />
          <Route path="/categories/:categoryId" component={CategoryContainer} />
          {categories.length && (
            <Redirect to={`/categories/${categories[0].id}`} />
          )}
        </Switch>
        <ModalContainer />
      </Container>
    );
  }
}

const mapStateToProps = (state) => ({
  categories: getCategories(state),
});


App.propTypes = {
  categories: PropTypes.arrayOf(PropTypes.shape({
    id: PropTypes.number,
  })).isRequired,
  fetchCategory: PropTypes.func,
}

export default connect(mapStateToProps, { fetchCategory })(App);
