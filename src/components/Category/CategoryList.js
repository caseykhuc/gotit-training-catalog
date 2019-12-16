import React from 'react';
import { connect } from 'react-redux';
import { fetchCategory } from '../../actions';

class CategoryList extends React.Component {
  componentDidMount() {
    if (!this.props.categories.length) {
      console.log('hmm k on');
      this.props.fetchCategory();
    }
  }

  renderCategoryList = () => {
    return this.props.categories.map((category) => <div key={category.id}>{category.name}</div>);
  };

  render() {
    console.log(this.props);
    return (
      <div>
        CategoryList
        {this.renderCategoryList()}
      </div>
    );
  }
}

const mapStateToProps = (state) => ({ categories: state.category.byId });

export default connect(mapStateToProps, { fetchCategory })(CategoryList);
