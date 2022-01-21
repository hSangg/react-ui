import {Box, Grid} from '@material-ui/core';
import React from 'react';
import Product from './Product';

function ProductList({data = []}) {
  return (
    <Box>
      <Grid container spacing={0}>
        {data.map((x, index) => (
          <Grid item xs={12} sm={6} md={4} lg={3}>
            <Product product={x} />
          </Grid>
        ))}
      </Grid>
    </Box>
  );
}

export default ProductList;
