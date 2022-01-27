import {Box, Container, Grid} from '@material-ui/core';
import {makeStyles} from '@material-ui/styles';
import React from 'react';
import {Route, Switch, useRouteMatch} from 'react-router-dom';
import AddToCartForm from '../Component/AddToCartForm';
import ProductAdditional from '../Component/ProductAdditional';
import ProductDescription from '../Component/ProductDescription';
import ProductInfor from '../Component/ProductInfor';
import ProductMenu from '../Component/ProductMenu';
import ProductReview from '../Component/ProductReview';
import ProductThumbnail from '../Component/ProductThumbnail';
import useProduct from '../Hook/useProduct';
import CircularProgress from '@material-ui/core/CircularProgress';
import {useDispatch} from 'react-redux';
import {addNewItem, showMiniCart} from 'components/Cart/cartSlice';

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
  loading: {
    position: 'fixed',
    left: '50%',
    top: '50%',
    transform: 'translate(50%, -5%)',
  },
}));

function DetailPage() {
  const classes = useStyles();
  const dispatch = useDispatch();
  const {
    params: {productId},
    url,
  } = useRouteMatch();

  const {product, loading} = useProduct(productId);

  if (loading)
    return (
      <div className={classes.loading}>
        <CircularProgress />
      </div>
    );

  const handleAddToCartForm = ({quantity}) => {
    dispatch(
      addNewItem({
        id: product.id,
        product,
        quantity,
      })
    );
    dispatch(showMiniCart());
  };

  return (
    <>
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

          <ProductMenu />

          <div
            style={{background: 'black', marginTop: '2rem', padding: '20px'}}>
            <Switch>
              <Route exact path={url}>
                <ProductDescription product={product} />
              </Route>
              <Route path={`${url}/additional`} component={ProductAdditional} />
              <Route path={`${url}/reviews`} component={ProductReview} />
            </Switch>
          </div>
        </Container>
      </Box>
    </>
  );
}

export default DetailPage;
