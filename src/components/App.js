/* eslint-disable import/no-named-as-default */
import React from 'react';
import { Route, Switch, Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import { Container } from 'react-bootstrap'
import PropTypes from 'prop-types';
import Header from './Header';

import { fetchCategory } from '../actions/category';
import { fetchUser } from '../actions/user';
import { getCategories } from '../reducers';

import CategoryContainer from './Category/CategoryContainer';
import CategoryList from './Category/CategoryList';
import ItemNew from './Item/ItemNew';
import ModalContainer from './ModalContainer';
import ItemSingle from './Item/ItemSingle';


export class App extends React.Component {
  componentDidMount() {
    const { fetchCategory, fetchUser } = this.props;
    fetchCategory();
    fetchUser();
  }

  render() {
    const { categories, userId } = this.props;

    return (
      <Container className="App my-4">
        <Header isSignedIn={Boolean(userId)} />
        <CategoryList categories={categories} />
        <Switch>
          <Route path="/new-item" component={ItemNew} />
          <Route path="/categories/items/:categoryId/:itemId" component={ItemSingle} />
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
  userId: state.user.userId,
});


App.propTypes = {
  categories: PropTypes.arrayOf(PropTypes.shape({
    id: PropTypes.number,
  })).isRequired,
  userId: PropTypes.number,
  fetchCategory: PropTypes.func,
  fetchUser: PropTypes.func,
}

export default connect(mapStateToProps, { fetchCategory, fetchUser })(App);
