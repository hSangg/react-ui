import {Box} from '@material-ui/core';
import React from 'react';
import FiltersByCategory from './FIlters/FiltersByCategory';

function ProductFilters({filters, onChange}) {
  const filtersByCategory = (newCategoryId) => {
    const newFilter = {
      ...filters,
      categoryId: newCategoryId,
    };

    onChange(newFilter);
  };

  return (
    <Box>
      <FiltersByCategory onChange={filtersByCategory} />
    </Box>
  );
}

export default ProductFilters;
