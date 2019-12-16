import React from 'react';
import Header from './Header';
import { Route, Switch, Redirect, withRouter } from 'react-router-dom';
import ModalContainer from './ModalContainer';
import Category from './Category/Category';
import ItemNew from './Item/ItemNew';
import CategoryList from './Category/CategoryList';

function App() {
  return (
    <div className='App'>
      <Header />
      <CategoryList />
      <Switch>
        <Route path='/new-item' component={ItemNew} />
        <Route path='/categories/:categoryId' component={Category} />
        <Redirect to='/categories/1' />
      </Switch>
      <ModalContainer />
    </div>
  );
}

export default App;
