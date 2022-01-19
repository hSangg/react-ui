import {Box, Divider, makeStyles} from '@material-ui/core';
import React from 'react';
import FilterByPrice from './FIlters/FilterByPrice';
import FilterByService from './FIlters/FilterByService';
import FiltersByCategory from './FIlters/FiltersByCategory';

const useStyles = makeStyles((theme) => ({
  devider: {
    backgroundColor: '#ffffff54',
    margin: theme.spacing(2, 1),
  },
}));

function ProductFilters({filters, onChange}) {
  const classes = useStyles();

  const filtersByCategory = (newCategoryId) => {
    onChange({'category.id': newCategoryId});
  };

  const handleFilterChange = (newFilter) => {
    onChange(newFilter);
  };

  return (
    <Box>
      <FiltersByCategory onChange={filtersByCategory} />
      <Divider className={classes.devider} />
      <FilterByPrice onChange={handleFilterChange} />
      <Divider className={classes.devider} />
      <FilterByService filters={filters} onChange={handleFilterChange} />
    </Box>
  );
}

export default ProductFilters;
