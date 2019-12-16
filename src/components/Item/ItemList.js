import React from 'react';
import { withRouter } from 'react-router-dom';

const ItemList = (props) => {
  //console.log(props);
  const renderItems = () => {};

  return <div>ItemList{renderItems()}</div>;
};

export default withRouter(ItemList);
