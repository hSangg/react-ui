import {Box, Container, Grid, Typography, makeStyles} from '@material-ui/core';
import productApi from 'api/productApi';
import React, {useState} from 'react';
import {useEffect} from 'react';
import ProductSkeleton from '../Component/ProductSkeleton';

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
    color: 'white',
    marginTop: theme.spacing(4),
  },
  left: {
    backgroundColor: '#202128',
    marginRight: '8px',
    width: '250px',
  },
  right: {
    backgroundColor: '#202128',
    flex: 1,
  },
}));

function ProductListPage() {
  const classes = useStyles();
  const [productList, setProductList] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    (async () => {
      const response = await productApi.getAll({_page: 1, _limit: 11});
      const {data} = response;
      setProductList(data);

      setLoading(true);
    })();
  }, []);

  return (
    <div>
      <Box>
        <Container>
          <Grid container spacing={1} className={classes.root}>
            <Grid item className={classes.left}>
              Left
            </Grid>

            <Grid item className={classes.right}>
              {!loading ? (
                <>
                  <ProductSkeleton />
                </>
              ) : (
                <Typography>List Product</Typography>
              )}
            </Grid>
          </Grid>
        </Container>
      </Box>
    </div>
  );
}

export default ProductListPage;
