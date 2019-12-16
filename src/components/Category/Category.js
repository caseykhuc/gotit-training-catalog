import React from 'react';
import CategoryDetails from './CategoryDetails';
import ItemList from '../Item/ItemList';

const Category = (props) => {
  return (
    <div>
      <CategoryDetails />
      <ItemList />
    </div>
  );
};

export default Category;
