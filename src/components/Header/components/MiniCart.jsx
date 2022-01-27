import {Box, Button, makeStyles, Typography} from '@material-ui/core';
import {hideMiniCart} from 'components/Cart/cartSlice';
import React from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {useHistory} from 'react-router-dom';

const useStyles = makeStyles((theme) => ({
  root: {
    position: 'absolute',
    right: '20px',
    top: '100%',

    background: 'black',
    padding: '10px',
    borderRadius: '4px',
    marginTop: '10px',
  },
  list: {
    padding: '5px 5px',
    marginTop: '10px',
    borderRadius: ' 5px',
    backgroundColor: '#7986cb57',
    '& > li': {
      padding: '0 3px',
      textAlign: 'center',
    },

    '& > li:nth-child(even)': {
      backgroundColor: '#3f51b575',
    },
  },
  button: {
    marginTop: '13px',
    backgroundColor: '#7c8ffb',
    '&:hover': {
      textDecoration: 'none',
      backgroundColor: '#778cff',
    },
  },
}));

function MiniCart() {
  const classes = useStyles();

  const {cartItems} = useSelector((state) => state.cart);
  const history = useHistory();
  const dispatch = useDispatch();
  const handleOnClick = () => {
    history.push('/carts');
    dispatch(hideMiniCart());
  };

  return (
    <Box className={classes.root}>
      <Typography align="center">Sản phẩm đã mua</Typography>
      <Box component="ul" className={classes.list}>
        {cartItems.map((item) => (
          <li key={item.id}>
            <Typography variant="body2">
              {item.product.name} x{' '}
              <span style={{fontSize: '1.2rem'}}>{item.quantity}</span>
            </Typography>
          </li>
        ))}
        <Button fullWidth onClick={handleOnClick} className={classes.button}>
          Thanh Toán
        </Button>
      </Box>
    </Box>
  );
}

export default MiniCart;
