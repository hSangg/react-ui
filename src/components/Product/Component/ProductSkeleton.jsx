import React from 'react';
import PropTypes from 'prop-types';
import {Box, Grid} from '@material-ui/core';
import {Skeleton} from '@material-ui/lab';

ProductSkeleton.propTypes = {
  length: PropTypes.number,
};

ProductSkeleton.defaultProps = {
  length: 9,
};

function ProductSkeleton({length}) {
  return (
    <Box>
      <Grid container spacing={0}>
        {Array.from(new Array(length)).map((x, index) => (
          <Grid item xs={12} sm={6} md={4} lg={3}>
            <Box padding={1}>
              <Skeleton variant="rect" width="100%" height={118} />
              <Skeleton />
              <Skeleton width="60%" />
            </Box>
          </Grid>
        ))}
      </Grid>
    </Box>
  );
}

export default ProductSkeleton;
