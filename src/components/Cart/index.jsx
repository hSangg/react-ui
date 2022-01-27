import React from 'react';
import {useSelector} from 'react-redux';
import {cartTotalPriceSelector} from './Selector';
import {Box, Container, Grid, makeStyles} from '@material-ui/core';
import ProductList from './components/ProductList';
import InforCustomer from './components/InforCustomer';

const useStyles = makeStyles((theme) => ({
  root: {
    marginTop: '30px',
  },
  left: {
    flex: 1,
  },
  right: {
    width: '350px',
    padding: '1rem',
    background: 'rgb(103 58 183 / 14%)',
    color: '#fff',
  },
}));

function CartFeature() {
  const totalPayment = useSelector(cartTotalPriceSelector);
  const {cartItems} = useSelector((state) => state.cart);

  const classes = useStyles();

  return (
    <Box className={classes.root}>
      <Container>
        <Grid container style={{gap: '10px'}}>
          <Grid item className={classes.left}>
            <ProductList productList={cartItems} />
          </Grid>
          <Grid item className={classes.right}>
            <InforCustomer totalPrice={totalPayment} />
          </Grid>
        </Grid>
      </Container>
    </Box>
  );
}

export default CartFeature;
