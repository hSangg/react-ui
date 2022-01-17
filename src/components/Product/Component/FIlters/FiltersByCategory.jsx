import {Box, Typography} from '@material-ui/core';
import categoryApi from 'api/categoryApi';
import React from 'react';
import {useEffect} from 'react';
import {useState} from 'react';

function FiltersByCategory({onChange = null}) {
  const [categoryList, setCategoryList] = useState();

  useEffect(() => {
    (async () => {
      try {
        const response = await categoryApi.getAll();
        setCategoryList(response.data);
      } catch (error) {
        console.log(error);
      }
    })();
  }, []);

  return (
    <Box padding={2}>
      <Typography>DANH MỤC SẢN PHẨM</Typography>
      {categoryList.map((category) => (
        <Typography key={category.id}>{category.name}</Typography>
      ))}
    </Box>
  );
}

export default FiltersByCategory;
