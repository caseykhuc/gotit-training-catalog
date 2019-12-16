import React from 'react';
import { connect } from 'react-redux';
import { signUp } from '../../actions';

const ItemShow = ({ posts, signUp }) => {
  const handlesignUp = () => {
    const res = signUp({ name: 'abc', pass: 'abcd' });
    res.then((res) => console.log(res));
  };

  return <button onClick={() => handlesignUp()}>Click</button>;
};

/* const mapStateToProps = (state) => ({
  signUp: ,
}); */

export default connect(null, { signUp })(ItemShow);
