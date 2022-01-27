import {Box} from '@material-ui/core';
import React, {useState} from 'react';
import CartItem from './CartItem';

function ProductList({productList}) {
  const [value, setValue] = useState('');

  return (
    <Box component="ul">
      {productList.map(({id, product, quantity}) => (
        <CartItem id={id} product={product} quantity={quantity} />
      ))}
    </Box>
  );
}

export default ProductList;
