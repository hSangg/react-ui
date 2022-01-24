import React from 'react';
import {Typography} from '@material-ui/core';
import {Rating} from '@material-ui/lab';
import {makeStyles} from '@material-ui/styles';
import {formatPrice} from 'common/formatPrice';

const useStyles = makeStyles((theme) => ({
  root: {display: 'flex', gap: '18px'},
  title: {
    fontSize: '2rem',
    fontWeight: '600',
    marginBottom: '0.5rem',
  },
  decription: {
    padding: '1rem',
    background: 'rgb(0 0 0 / 16%)',
    marginBottom: '0.5rem',
  },
  rating: {
    marginBottom: '1rem',
    background: '#ffff0014',
    borderRadius: '38px',
    padding: '4px 9px',
    '& > span': {
      margin: '0 2px',
    },
  },
  price: {fontSize: '2rem', marginBottom: '0.5rem'},
  salePrice: {
    textDecoration: 'line-through',
    opacity: '0.4',
    fontSize: '1.2rem',
    marginLeft: '1rem',
  },
  service: {
    backgroundColor: '#5f9ea04d',
    display: 'inline-block',
    padding: '2px 15px',
    margin: '10px 0',
    borderRadius: '30px',
  },
}));

function ProductInfor({product = {}}) {
  const {
    name,
    shortDescription,
    isFreeShip,
    isPromotion,
    originalPrice,
    salePrice,
  } = product;

  const classes = useStyles();

  const priceUI = formatPrice(salePrice);
  const pricePre = formatPrice(originalPrice);

  return (
    <>
      <Typography className={classes.title}>{name}</Typography>
      <Rating
        size="small"
        value={Math.floor(Math.random() * 5 + 1)}
        readOnly
        className={classes.rating}
      />
      <Typography className={classes.decription}>{shortDescription}</Typography>

      <Typography className={classes.price} component="span">
        Giá: {priceUI}
      </Typography>

      {isPromotion && (
        <>
          <Typography className={classes.salePrice} component="span">
            {pricePre}
          </Typography>
        </>
      )}

      <div className={classes.root}>
        {isFreeShip && (
          <div>
            <Typography className={classes.service}>
              Giao Hàng Miễn Phí
            </Typography>
          </div>
        )}

        {isPromotion && (
          <div>
            <Typography className={classes.service}>
              Giảm giá đặc biệt
            </Typography>
          </div>
        )}
      </div>
    </>
  );
}

export default ProductInfor;
