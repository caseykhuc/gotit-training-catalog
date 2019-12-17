import React from 'react';
import { Route, Switch, Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import { Container } from 'react-bootstrap'
import Header from './Header';

import { fetchCategory } from '../actions/category';
import { getCategories } from '../reducers';

import CategoryContainer from './Category/CategoryContainer';
import CategoryList from './Category/CategoryList';
import ItemNew from './Item/ItemNew';
import ModalContainer from './ModalContainer';


class App extends React.Component {
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

export default connect(mapStateToProps, { fetchCategory })(App);
