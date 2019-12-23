/* eslint-disable import/no-named-as-default */
import React from 'react';
import { Route, Switch, Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import { Container, Alert } from 'react-bootstrap'
import PropTypes from 'prop-types';
import Header from './Header';

import { fetchCategory } from '../actions/category';
import { fetchUser } from '../actions/user';
import { getCategories } from '../reducers';

import CategoryContainer from './Category/CategoryContainer';
import CategoryList from './Category/CategoryList';
import ModalContainer from './ModalContainer';
import ItemSingle from './Item/ItemSingle';
import LoadingPage from './LoadingPage';

export class App extends React.Component {
  componentDidMount() {
    const { fetchCategory, fetchUser } = this.props;
    fetchCategory();
    fetchUser();
  }

  renderLoading = () => {
    const { isLoading, error } = this.props;
    if (isLoading) return <LoadingPage />
    return <Alert variant="danger">{error}</Alert>
  }

  render() {
    const { categories, userId } = this.props;

    return (
      (
        <Container className="App my-4">
          <Header isSignedIn={Boolean(userId)} />
          {categories.length
            ? (
              <div>
                <CategoryList
                  categories={categories}
                  defaultSelected={categories.length ? categories[0].id : NaN}
                />
                <Switch>
                  <Route exact path="/categories/items/:categoryId/:itemId" component={ItemSingle} />
                  <Route exact path="/categories/:categoryId" component={CategoryContainer} />
                  {categories.length && (
                    <Redirect to={`/categories/${categories[0].id}`} />
                  )}
                </Switch>
              </div>
            )
            : this.renderLoading()}
          <ModalContainer />
        </Container>
      )
    );
  }
}

const mapStateToProps = (state) => ({
  categories: getCategories(state),
  userId: state.user.userId,
  isLoading: state.user.isLoading && state.category.isLoading,
  error: state.user.error || state.category.error,
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
