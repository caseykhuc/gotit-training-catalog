import React from 'react';
import { Container, Row, Col } from 'react-bootstrap';
import { Link } from 'react-router-dom';

const CategoryList = ({ categories }) => {
  const renderCategoryList = () => {
    return categories.map((category) => (
      <Col key={category.id}>
        <Link to={`/categories/${category.id}`}>{category.name}</Link>
      </Col>
    ));
  };

  return (
    <Container style={{ textAlign: 'center', margin: '30px 0' }}>
      <Row>{renderCategoryList()}</Row>
    </Container>
  );
};

export default CategoryList;
