import React from 'react';
import { connect } from 'react-redux';
import { fetchCategory } from '../../actions';
import { Container, Row, Col } from 'react-bootstrap';

class CategoryList extends React.Component {
  componentDidMount() {
    if (!this.props.categories.length) {
      console.log('hmm k on');
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
      <div>
        CategoryList
        <Container>
          <Row>{this.renderCategoryList()}</Row>
        </Container>
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  categories: Array.from(state.category.byId),
});

export default connect(mapStateToProps, { fetchCategory })(CategoryList);
