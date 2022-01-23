import {Box, Container, Grid, makeStyles} from '@material-ui/core';
import {Pagination} from '@material-ui/lab';
import productApi from 'api/productApi';
import React, {useEffect, useMemo, useState} from 'react';
import {useHistory, useLocation} from 'react-router-dom';
import FilterViewer from '../Component/FilterViewer';
import ProductFilters from '../Component/ProductFilters';
import ProductList from '../Component/ProductList';
import ProductSkeleton from '../Component/ProductSkeleton';
import ProductSorting from '../Component/ProductSorting';
import queryString from 'query-string';

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

  const history = useHistory();
  const location = useLocation();

  const queryParam = useMemo(() => {
    const params = queryString.parse(location.search);

    return {
      ...params,
      _page: Number.parseInt(params._page) || 1,
      _limit: Number.parseInt(params._limit) || 9,
      _sort: params._sort || sort,
      ['category.id']: params['category.id'],
      isFreeShip: params.isFreeShip === 'true',
      isPromotion: params.isPromotion === 'true',
    };
  }, [location.search]);

  // const [filters, setFilters] = useState({
  //   ...queryParam,
  //   _page: queryParam._page || 1,
  //   _limit: queryParam._limit || 9,
  //   _sort: queryParam._sort || sort,
  // });

  // useEffect(() => {
  //   history.push({
  //     pathname: history.location.pathname,
  //     search: queryString.stringify(filters),
  //   });
  // }, [history, filters]);

  const [pagination, setPagination] = useState({});

  useEffect(() => {
    (async () => {
      try {
        const response = await productApi.getAll(queryParam);
        const {data, pagination} = response;
        setProductList(data);
        setPagination(pagination);
        setLoading(true);
      } catch (error) {
        console.log('error: ', error);
      }
    })();
  }, [queryParam]);

  const {limit, page, total} = pagination;
  const countPage = Math.ceil(total / limit);

  const handlePageChange = (e, page) => {
    const filters = {
      ...queryParam,
      _page: page,
    };

    history.push({
      pathname: history.location.pathname,
      search: queryString.stringify(filters),
    });
  };

  const handleSortChange = (e, newValue) => {
    console.log('newValue: ', newValue);

    const filters = {
      ...queryParam,
      ...newValue,
    };

    history.push({
      pathname: history.location.pathname,
      search: queryString.stringify(filters),
    });

    setSort(newValue);
  };

  const handleFiltersChange = (newFilters) => {
    const filters = {
      ...queryParam,
      ...newFilters,
    };

    history.push({
      pathname: history.location.pathname,
      search: queryString.stringify(filters),
    });
  };

  return (
    <div>
      <Box>
        <Container>
          <Grid container spacing={1} className={classes.root}>
            <Grid item className={classes.left}>
              <Box>
                <ProductFilters
                  filters={queryParam}
                  onChange={handleFiltersChange}
                />
              </Box>
            </Grid>

            <Grid item className={classes.right}>
              <ProductSorting onChange={handleSortChange} currentValue={sort} />

              <FilterViewer
                filters={queryParam}
                onChange={handleFiltersChange}
              />

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
