import {Box, makeStyles, Typography} from '@material-ui/core';
import {STATIC_HOST, THUMBNAIL_PLACEHOLDER} from 'Constant/common';
import React from 'react';
import {Rating} from '@material-ui/lab';
import StarRoundedIcon from '@material-ui/icons/StarRounded';

const useStyles = makeStyles((theme) => ({
  price: {
    fontWeight: '600',
    fontSize: '1rem',
  },
  ratingStar: {
    margin: theme.spacing(1, 0),
  },
}));

function Product({product = {}}) {
  const thumbnail = product.thumbnail?.url
    ? `${STATIC_HOST}${product.thumbnail.url}`
    : THUMBNAIL_PLACEHOLDER;

  const pricePer =
    Number.parseInt(product.promotionPercent) > 0
      ? `- ${Number.parseInt(product.promotionPercent)}%`
      : '';

  const price = `${new Intl.NumberFormat('vi-VN').format(
    Number.parseInt(product.salePrice)
  )} VND`;
  const classes = useStyles();

  const randomRating = () => {
    return Math.floor(Math.random() * 5) + 1;
  };

  return (
    <Box padding={1.2}>
      <Box padding={1}>
        <img src={thumbnail} />
      </Box>

      <Typography variant="body2">{product.name}</Typography>
      <Rating
        value={randomRating()}
        size="small"
        className={classes.ratingStar}
        icon={<StarRoundedIcon fontSize="inherit" />}
        readOnly={true}
      />
      <Typography variant="body2">
        <span className={classes.price}>{`${price}`}</span> {pricePer}
      </Typography>
    </Box>
  );
}

export default Product;
