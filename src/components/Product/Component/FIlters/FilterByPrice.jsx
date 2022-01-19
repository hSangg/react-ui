import {Box, Button, TextField, Typography} from '@material-ui/core';
import {makeStyles} from '@material-ui/styles';
import React, {useState} from 'react';

const useStyles = makeStyles((theme) => ({
  root: {
    margin: theme.spacing(1),
    color: '#fff',

    '& input': {
      color: '#fff',
      marginTop: theme.spacing(2),
    },
    '& button': {
      color: '#fff',
      marginTop: theme.spacing(2),
    },
  },
}));

function FilterByPrice({onChange = null}) {
  const classes = useStyles();

  const [value, setValue] = useState({
    salePrice_gte: 0,
    salePrice_lte: 0,
  });

  const handlePriceChange = (e) => {
    const {name, value} = e.target;

    const newValue = {
      [name]: parseFloat(value.toString().replace(/,/g, '')),
    };
    setValue((pre) => ({
      ...pre,
      ...newValue,
    }));
  };

  const handleSubmit = () => {
    console.log(value);
    onChange(value);
  };

  return (
    <Box className={classes.root}>
      <Typography>GIÁ</Typography>
      <Box>
        <TextField
          name="salePrice_gte"
          onChange={handlePriceChange}
          placeholder="từ"
          value={new Intl.NumberFormat().format(value.salePrice_gte || 0)}
        />
        <span> - </span>
        <TextField
          name="salePrice_lte"
          onChange={handlePriceChange}
          placeholder="đến"
          value={new Intl.NumberFormat().format(value.salePrice_lte || 0)}
        />
      </Box>

      <Button onClick={handleSubmit}>SUBMIT</Button>
    </Box>
  );
}

export default FilterByPrice;
