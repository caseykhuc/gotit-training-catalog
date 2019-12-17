import React from 'react';
import Header from './Header';
import { Route, Switch, Redirect } from 'react-router-dom';

import { fetchCategory } from '../actions/category';
import { connect } from 'react-redux';
import { getCategories } from '../reducers';

import Category from './Category/Category';
import CategoryList from './Category/CategoryList';
import ItemNew from './Item/ItemNew';
import ModalContainer from './ModalContainer';

class App extends React.Component {
  componentDidMount() {
    this.props.fetchCategory();
  }

  render() {
    const { categories } = this.props;
    /* console.log(categories); */

    return (
      <div className='App'>
        <Header />
        <CategoryList categories={categories} />
        <Switch>
          <Route path='/new-item' component={ItemNew} />
          <Route path='/categories/:categoryId' component={Category} />
          {categories.length && (
            <Redirect to={`/categories/${categories[0].id}`} />
          )}
        </Switch>
        <ModalContainer />
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  categories: getCategories(state),
});

export default connect(mapStateToProps, { fetchCategory })(App);
