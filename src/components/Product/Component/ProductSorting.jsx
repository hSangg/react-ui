import {Tab, Tabs, makeStyles} from '@material-ui/core';
import React, {useState} from 'react';

const useStyles = makeStyles((theme) => ({
  option: {
    margin: theme.spacing(1, 1, 2, 1),
    '& span': {
      backgroundColor: '#303f9f29',
    },
  },
}));

function ProductSorting({currentValue, onChange}) {
  const classes = useStyles();

  const handleChange = (e, newValue) => {
    onChange(e, newValue);
  };

  return (
    <Tabs
      onChange={handleChange}
      value={currentValue}
      indicatorColor="primary"
      textColor="primary">
      <Tab
        className={classes.option}
        label="high to low"
        value="salePrice:DESC"
      />
      <Tab
        className={classes.option}
        label="low to high"
        value="salePrice:ASC"
      />
    </Tabs>
  );
}

export default ProductSorting;
