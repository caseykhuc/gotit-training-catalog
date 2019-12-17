import React from 'react';
import { Link } from 'react-router-dom';
import ScrollMenu from 'react-horizontal-scrolling-menu';
import PropTypes from 'prop-types';

// All items component
// Important! add unique key
export const Menu = (list) => list.map((el) => {
  const { name, id } = el;
  return (
    <Link style={{ padding: '10px' }} to={`/categories/${id}`} key={id}>
      {name}
    </Link>
  );
});

const ArrowLeft = <div style={{ padding: '10px' }}>{'<'}</div>;
const ArrowRight = <div style={{ padding: '10px' }}>{'>'}</div>;

/** *
 *
 * */

class CategoryList extends React.Component {
  render() {
    const { categories } = this.props;
    const menu = Menu(categories);
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
  categories: PropTypes.arrayOf(PropTypes.object).isRequired,
}

export default CategoryList;
