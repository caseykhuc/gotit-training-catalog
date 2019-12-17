import React from 'react';
import PropTypes from 'prop-types';

import { Card } from 'react-bootstrap';

const CategoryDetails = ({ category }) => (
  <Card>
    <Card.Header as="h5">{category.name}</Card.Header>
    <Card.Body>
      <Card.Text>{category.description}</Card.Text>
    </Card.Body>
  </Card>
);

CategoryDetails.propTypes = {
  category: PropTypes.shape({
    name: PropTypes.string,
    description: PropTypes.string,
  }).isRequired,
}

export default CategoryDetails;
