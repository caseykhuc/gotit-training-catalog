import React from 'react';
import { Link } from 'react-router-dom';
import ScrollMenu from 'react-horizontal-scrolling-menu';

// All items component
// Important! add unique key
export const Menu = (list, selected) =>
  list.map((el) => {
    const { name, id } = el;
    return (
      <Link style={{ padding: '10px' }} to={`/categories/${id}`} key={id}>
        {name}
      </Link>
    );
  });

const ArrowLeft = <div style={{ padding: '10px' }}>{'<'}</div>;
const ArrowRight = <div style={{ padding: '10px' }}>{'>'}</div>;

/***
 *
 * */

class CategoryList extends React.Component {
  render() {
    const menu = Menu(this.props.categories);
    return (
      <ScrollMenu
        className='ahihi'
        data={menu}
        arrowLeft={ArrowLeft}
        arrowRight={ArrowRight}
        selected={this.props.categories[0]}
        onSelect={this.onSelect}
      />
    );
  }
}

export default CategoryList;
