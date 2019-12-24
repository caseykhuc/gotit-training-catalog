/* eslint-disable import/no-named-as-default */
import React from 'react';
import { Route, Switch, Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import { Container, Alert } from 'react-bootstrap'
import PropTypes from 'prop-types';
import Header from 'components/Header';

import { fetchCategory } from 'actions/category';
import { fetchUser } from 'actions/user';
import { getCategories } from 'reducers';

import CategoryContainer from 'components/Category/CategoryContainer';
import CategoryList from 'components/Category/CategoryList';
import ModalContainer from 'components/ModalContainer';
import ItemSingle from 'components/Item/ItemSingle';
import LoadingPage from 'components/LoadingPage';

export class App extends React.Component {
  componentDidMount() {
    this.fetchInit();
  }

  // prevent any actions before both user state and category are ready
  fetchInit = async () => {
    const { fetchCategory, fetchUser } = this.props;
    await fetchUser();
    fetchCategory();
  }

  // show only loading page before fetchInit finishes
  // show Error when fetchCategory failed
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
          {categories.length
            ? (
              <div>
                <Header isSignedIn={Boolean(userId)} />
                <CategoryList
                  categories={categories}
                  defaultSelected={categories[0].id}
                />
                <Switch>
                  <Route exact path="/categories/items/:categoryId/:itemId" component={ItemSingle} />
                  <Route exact path="/categories/:categoryId" component={CategoryContainer} />
                  <Redirect to={`/categories/${categories[0].id}`} />
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
  isLoading: state.user.isLoading || state.category.isLoading,
  error: state.user.error || state.category.error,
});

App.propTypes = {
  categories: PropTypes.arrayOf(PropTypes.shape({
    id: PropTypes.number,
  })).isRequired,
  fetchCategory: PropTypes.func.isRequired,
  fetchUser: PropTypes.func.isRequired,
  isLoading: PropTypes.bool.isRequired,
  userId: PropTypes.number,
  error: PropTypes.string,
}

export default connect(mapStateToProps, { fetchCategory, fetchUser })(App);
