import {Box, Container, Grid, Typography, makeStyles} from '@material-ui/core';
import {Pagination} from '@material-ui/lab';
import productApi from 'api/productApi';
import React, {useState} from 'react';
import {useEffect} from 'react';
import ProductList from '../Component/ProductList';
import ProductSkeleton from '../Component/ProductSkeleton';
import ProductSorting from '../Component/ProductSorting';
import GradeRoundedIcon from '@material-ui/icons/GradeRounded';
import ProductFilters from '../Component/ProductFilters';

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
    color: 'white',
    marginTop: theme.spacing(4),
    marginBottom: theme.spacing(4),
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
  pagiantion: {
    '& ul': {
      justifyContent: 'center',
    },
    marginTop: theme.spacing(2),
    paddingBottom: theme.spacing(2),
    '& li button': {
      color: '#b7b6ff',
    },
  },
}));

function ProductListPage() {
  const classes = useStyles();
  const [sort, setSort] = useState(null);
  const [productList, setProductList] = useState([]);
  const [loading, setLoading] = useState(false);
  const [filters, setFilters] = useState({
    _page: 1,
    _limit: 9,
    _sort: sort,
  });
  const [pagination, setPagination] = useState({});

  useEffect(() => {
    (async () => {
      try {
        const response = await productApi.getAll(filters);
        const {data, pagination} = response;
        setProductList(data);
        setPagination(pagination);
        setLoading(true);
      } catch (error) {
        console.log(error);
      }
    })();
  }, [filters]);

  const {limit, page, total} = pagination;
  console.log(page);
  const countPage = Math.ceil(total / limit);

  const handlePageChange = (event, page) => {
    setFilters((pre) => ({
      ...pre,
      _page: page,
    }));
  };

  const handleSortChange = (e, newValue) => {
    setFilters((pre) => ({
      ...pre,
      _sort: newValue,
    }));

    setSort(newValue);
  };

  const handleFiltersChange = (newFilters) => {
    setFilters((pre) => ({
      ...pre,
      ...newFilters,
    }));
  };

  return (
    <div>
      <Box>
        <Container>
          <Grid container spacing={1} className={classes.root}>
            <Grid item className={classes.left}>
              <Box>
                <ProductFilters
                  filters={filters}
                  onChange={handleFiltersChange}
                />
              </Box>
            </Grid>

            <Grid item className={classes.right}>
              <ProductSorting onChange={handleSortChange} currentValue={sort} />

              {!loading ? (
                <>
                  <ProductSkeleton />
                </>
              ) : (
                <ProductList data={productList} />
              )}

              <Pagination
                count={countPage}
                className={classes.pagiantion}
                onChange={(event, page) => handlePageChange(event, page)}
              />
            </Grid>
          </Grid>
        </Container>
      </Box>
    </div>
  );
}

export default ProductListPage;
