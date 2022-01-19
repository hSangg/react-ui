import {Box, Typography} from '@material-ui/core';
import {makeStyles} from '@material-ui/styles';
import categoryApi from 'api/categoryApi';
import React from 'react';
import {useEffect} from 'react';
import {useState} from 'react';

const useStyles = makeStyles((theme) => ({
  root: {
    padding: theme.spacing(1),
    marginTop: theme.spacing(2),
    '& > li': {
      listStyle: 'none',
      marginTop: theme.spacing(1),
      transition: '0.25s ease-in',
      cursor: 'pointer',
      '&:hover': {
        color: theme.palette.primary.light,
      },
    },
    '& > p': {
      fontWeight: '600',
    },
  },
}));

function FiltersByCategory({onChange = null}) {
  const [categoryList, setCategoryList] = useState([]);

  const classes = useStyles();

  useEffect(() => {
    (async () => {
      try {
        const response = await categoryApi.getAll();
        const list = response.data.map((x) => ({
          id: x.id,
          name: x.name,
        }));

        setCategoryList(list);
      } catch (error) {
        console.log(error);
      }
    })();
  }, []);

  const handleCategoryClick = (category) => {
    onChange(category.id);
  };

  return (
    <Box className={classes.root}>
      <Typography>DANH MỤC SẢN PHẨM</Typography>
      {categoryList.map((category) => (
        <li key={category.id} onClick={() => handleCategoryClick(category)}>
          <Typography> {category.name}</Typography>
        </li>
      ))}
    </Box>
  );
}

export default FiltersByCategory;
