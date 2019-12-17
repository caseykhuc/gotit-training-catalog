import React from 'react';
import { ListGroup } from 'react-bootstrap'

const ItemList = ({ items }) => {
  // console.log(props);
  const renderItems = () => items.map((item) => <ListGroup.Item key={item.id}>{item.name}</ListGroup.Item>);

  console.log(items);

  return (
    <ListGroup>
      {renderItems()}
    </ListGroup>
  );
};

export default ItemList;
