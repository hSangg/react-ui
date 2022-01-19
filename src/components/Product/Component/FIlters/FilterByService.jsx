import {
  Box,
  Checkbox,
  FormControlLabel,
  makeStyles,
  Typography,
} from '@material-ui/core';
import React from 'react';

const useStyles = makeStyles((theme) => ({
  root: {
    margin: theme.spacing(1),
    '& p': {
      fontWeight: '600',
    },
    '& label': {
      margin: theme.spacing(1, 1, 1, 0),
      '&:first-child': {
        marginTop: theme.spacing(2),
      },
    },
  },
}));

function FilterByService({filters = {}, onChange = null}) {
  const classes = useStyles();

  const handleChange = (e) => {
    const {name, checked} = e.target;
    onChange({
      [name]: checked,
    });
  };

  return (
    <Box className={classes.root}>
      <Typography>DỊCH VỤ</Typography>
      {[
        {name: 'isPromotion', label: 'Giảm giá sock'},
        {name: 'isFreeShip', label: 'Giao hàng miễn phí'},
      ].map(({name, label}) => (
        <FormControlLabel
          control={
            <Checkbox
              checked={!!filters[name]}
              onChange={handleChange}
              name={name}
              color="primary"
            />
          }
          label={label}
        />
      ))}
    </Box>
  );
}

export default FilterByService;
