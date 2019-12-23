import React from 'react';
import { Link } from 'react-router-dom';
import ScrollMenu from 'react-horizontal-scrolling-menu';
import PropTypes from 'prop-types';

import './CategoryList.css';

const ArrowLeft = <div style={{ padding: '10px' }}>{'<'}</div>;
const ArrowRight = <div style={{ padding: '10px' }}>{'>'}</div>;

/** *
 *
 * */

// eslint-disable-next-line react/prefer-stateless-function
class CategoryList extends React.Component {
  state = { selected: NaN }

  onSelect = (key) => {
    this.setState({ selected: Number(key) })
  }

  render() {
    const { categories, defaultSelected } = this.props;
    const selected = this.state.selected || defaultSelected;

    const menu = categories.map(({ id, name }) => (
      <Link className={`menu-link ${id === selected && 'active-link'}`} to={`/categories/${id}`} key={id}>
        <span>{name.toUpperCase()}</span>
      </Link>
    ));

    return (
      <div className="my-4">
        <ScrollMenu
          data={menu}
          arrowLeft={ArrowLeft}
          arrowRight={ArrowRight}
          onSelect={this.onSelect}
        />
      </div>
    );
  }
}

CategoryList.propTypes = {
  categories: PropTypes.arrayOf(PropTypes.shape({
    name: PropTypes.string,
    id: PropTypes.number,
  })).isRequired,
  defaultSelected: PropTypes.number,
}

export default CategoryList;
