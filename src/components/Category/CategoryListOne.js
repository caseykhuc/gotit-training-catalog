import React from 'react';
import { Container, Row, Col } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import ScrollMenu from 'react-horizontal-scrolling-menu';

// One item component
// selected prop will be passed
const MenuItem = ({ text, link }) => {
  return (
    <div style={{ padding: '10px' }}>
      <Link to={link}>{text}</Link>
    </div>
  );
};

// All items component
// Important! add unique key
export const Menu = (list, selected) =>
  list.map((el) => {
    const { name, id } = el;
    return <MenuItem text={name} key={id} link={`/categories/${id}`} />;
  });

const Arrow = ({ text, className }) => {
  return (
    <div style={{ padding: '10px' }} className={className}>
      {text}
    </div>
  );
};

const ArrowLeft = Arrow({ text: '<', className: 'arrow-prev' });
const ArrowRight = Arrow({ text: '>', className: 'arrow-next' });

/***
 *
 * */

class CategoryListOne extends React.Component {
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

export default CategoryListOne;
