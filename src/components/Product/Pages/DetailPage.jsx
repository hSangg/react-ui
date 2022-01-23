import {Box, Container, Grid} from '@material-ui/core';
import {makeStyles} from '@material-ui/styles';
import productApi from 'api/productApi';
import React, {useEffect, useState} from 'react';
import {useRouteMatch} from 'react-router-dom';
import AddToCartForm from '../Component/AddToCartForm';
import ProductInfor from '../Component/ProductInfor';
import ProductThumbnail from '../Component/ProductThumbnail';
import useProduct from '../Hook/useProduct';

const useStyles = makeStyles((theme) => ({
  root: {color: 'white', marginTop: theme.spacing(2)},
  left: {
    width: '400px',
    backgroundColor: '#1D1E24',
  },
  right: {
    flex: 1,
    backgroundColor: '#1D1E24',
  },
}));

function DetailPage() {
  const classes = useStyles();
  const url = useRouteMatch();
  const {
    params: {productId},
  } = url;

  const {product, loading} = useProduct(productId);

  const handleAddToCartForm = (value) => {
    console.log('value: ', value);
  };

  return (
    <Box className={classes.root}>
      <Container>
        <Grid container spacing={4}>
          <Grid item className={classes.left}>
            <ProductThumbnail product={product} />
          </Grid>
          <Grid item className={classes.right}>
            <ProductInfor product={product} />
            <AddToCartForm onSubmit={handleAddToCartForm} />
          </Grid>
        </Grid>
      </Container>
    </Box>
  );
}

export default DetailPage;
