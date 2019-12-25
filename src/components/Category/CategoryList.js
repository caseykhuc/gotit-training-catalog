import React from 'react';
import { withRouter, Link } from 'react-router-dom';
import ScrollMenu from 'react-horizontal-scrolling-menu';
import PropTypes from 'prop-types';

import './CategoryList.css';

const ArrowLeft = <div style={{ padding: '10px' }}>{'<'}</div>;
const ArrowRight = <div style={{ padding: '10px' }}>{'>'}</div>;

/** *
 *
 * */

class CategoryList extends React.Component {
  onSelect = (key) => {
    const { history } = this.props
    history.push(`/categories/${key}`);
  }

  render() {
    const { categories, match } = this.props;
    const selected = Number(match.params.categoryId);

    const menu = categories.map(({ id, name }) => (
      <div
        className={`menu-link ${id === selected ? 'active-link' : ''}`}
        key={id}
      >
        <span>{name.toUpperCase()}</span>
      </div>
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
  match: PropTypes.shape({
    params: PropTypes.shape({
      categoryId: PropTypes.string,
    }),
  }).isRequired,
  history: PropTypes.shape({
    push: PropTypes.func.isRequired,
  }).isRequired,
}

export default withRouter(CategoryList);
