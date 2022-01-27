import {Box, Divider, makeStyles, Typography} from '@material-ui/core';
import {formatPrice} from 'common/formatPrice';
import React from 'react';

const useStyles = makeStyles((theme) => ({
  root: {},
  total: {
    display: 'flex',
    marginTop: '0.5rem',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: '0 12px',
  },
  infor: {
    margin: '0.5rem',
    '& > p': {
      padding: '0.2rem',
    },
  },
  totalPrice: {
    padding: '0.1rem 0.4rem',
    fontWeight: '600',
    fontSize: '1.3rem',
    background: '#673ab7',
  },
  price: {
    padding: '5px 0',
    display: 'flex',
    justifyContent: 'space-between',
    margin: '0 12px',
    fontWeight: '500',
  },
}));

function InforCustomer({totalPrice}) {
  const classes = useStyles();
  const newPrice = totalPrice + 150000 + 250000;

  return (
    <Box>
      <Typography
        style={{marginLeft: '10px', fontSize: '1.2rem', fontWeight: 'bold'}}>
        Thông tin người nhận
      </Typography>
      <Divider style={{backgroundColor: 'rgb(255 255 255 / 17%)'}} />
      <div className={classes.infor}>
        <Typography>Tên: Cao Hoài Sang</Typography>
        <Typography>SĐT: 0944552051</Typography>
        <Typography>Địa chỉ: Hồng Dân, Bạc Liêu</Typography>
      </div>
      <Divider style={{backgroundColor: 'rgb(255 255 255 / 17%)'}} />
      <div>
        <div className={classes.price}>
          <Typography>Phí vận chuyển</Typography>
          <Typography>{formatPrice(150000)}</Typography>
        </div>
        <div className={classes.price}>
          <Typography>Phí VAT</Typography>
          <Typography>{formatPrice(250000)}</Typography>
        </div>

        <div className={classes.price}>
          <Typography>Giá sản phẩm</Typography>
          <Typography>{formatPrice(totalPrice)}</Typography>
        </div>
      </div>
      <Divider style={{backgroundColor: 'rgb(255 255 255 / 17%)'}} />
      <div className={classes.total}>
        <Typography style={{fontSize: '1.2rem'}}>Total: </Typography>
        <Typography className={classes.totalPrice}>
          {formatPrice(newPrice)}
        </Typography>
      </div>
    </Box>
  );
}

export default InforCustomer;
