import React from 'react';
import { connect } from 'react-redux';
import { fetchCategory } from '../../actions';
import { Container, Row, Col } from 'react-bootstrap';
import { getCategories } from '../../reducers';

class CategoryList extends React.Component {
  componentDidMount() {
    if (!this.props.categories.length) {
      //console.log('hmm k on');
      this.props.fetchCategory();
    }
  }

  renderCategoryList = () => {
    return this.props.categories.map((category) => (
      <Col key={category.id}>{category.name}</Col>
    ));
  };

  render() {
    console.log(this.props);
    return (
      <Container style={{ textAlign: 'center' }}>
        <Row>{this.renderCategoryList()}</Row>
      </Container>
    );
  }
}

const mapStateToProps = (state) => ({
  categories: getCategories(state),
});

export default connect(mapStateToProps, { fetchCategory })(CategoryList);
