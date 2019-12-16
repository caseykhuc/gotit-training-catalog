import React from 'react';

import { Card } from 'react-bootstrap';

const CategoryDetails = ({ category }) => {
  return (
    <Card>
      <Card.Header as='h5'>{category.name}</Card.Header>
      <Card.Body>
        <Card.Text>{category.description}</Card.Text>
      </Card.Body>
    </Card>
  );
};

export default CategoryDetails;
