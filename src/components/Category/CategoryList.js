import React from 'react';
import { Link } from 'react-router-dom';
import ScrollMenu from 'react-horizontal-scrolling-menu';
import PropTypes from 'prop-types';

const ArrowLeft = <div style={{ padding: '10px' }}>{'<'}</div>;
const ArrowRight = <div style={{ padding: '10px' }}>{'>'}</div>;

/** *
 *
 * */

class CategoryList extends React.Component {
  render() {
    const { categories } = this.props;
    const menu = categories.map((cat) => (
      <Link style={{ padding: '10px' }} to={`/categories/${cat.id}`} key={cat.id}>
        {cat.name}
      </Link>
    ));
    return (
      <ScrollMenu
        className="ahihi"
        data={menu}
        arrowLeft={ArrowLeft}
        arrowRight={ArrowRight}
        selected={categories[0]}
        onSelect={this.onSelect}
      />
    );
  }
}

CategoryList.propTypes = {
  categories: PropTypes.arrayOf(PropTypes.shape({
    name: PropTypes.string,
    id: PropTypes.number,
  })).isRequired,
}

export default CategoryList;
