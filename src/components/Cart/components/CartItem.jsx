import {yupResolver} from '@hookform/resolvers/yup';
import {Button, IconButton, Typography} from '@material-ui/core';
import {makeStyles} from '@material-ui/styles';
import {formatPrice} from 'common/formatPrice';
import QuantityField from 'components/QuantityField';
import {STATIC_HOST, THUMBNAIL_PLACEHOLDER} from 'Constant/common';
import React from 'react';
import {useForm} from 'react-hook-form';
import * as yup from 'yup';
import BackspaceIcon from '@material-ui/icons/Backspace';
import {useDispatch} from 'react-redux';
import {deleteItem, setQuantity} from '../cartSlice';

const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
    alignItems: 'center',
    marginBottom: '10px',
    justifyContent: 'start',
    gap: '20px',
    background: '#1E1F23',
    color: 'white',
    padding: '0.5rem 0.8rem',
    '&:last-child': {
      marginBottom: 0,
    },
  },
  image: {
    width: '110px',
  },
  name: {fontSize: '1.5rem'},
  infor: {
    alignSelf: 'start',
  },
  button: {
    marginTop: '1rem',
  },
  price: {fontSize: '1.1rem'},
  quantity: {fontSize: '1rem', opacity: '0.4', marginLeft: '10px'},
  form: {
    marginLeft: 'auto',
    '& input': {
      maxWidth: '100px',
      padding: '0',
      margin: '0 17px',
      color: 'white',
    },
  },
}));

function CartItem({id, product, quantity}) {
  const classes = useStyles();
  const thumbnail = product.thumbnail?.url
    ? `${STATIC_HOST}${product.thumbnail.url}`
    : THUMBNAIL_PLACEHOLDER;

  const dispatch = useDispatch();

  const formatPrices = formatPrice(product.salePrice);
  const formatQuantity = `0${quantity}`.slice(-2);

  const schema = yup.object().shape({
    quantity: yup
      .number()
      .required('Nhập vào số lượng sản phẩm')
      .min(1, 'Ít nhất một sản phẩm')
      .typeError('Nhập vào số lượng sản phẩm'),
  });

  const form = useForm({
    defaultValues: {
      quantity: quantity,
    },
    resolver: yupResolver(schema),
  });

  const handleSubmit = async (value) => {
    dispatch(
      setQuantity({
        id,
        quantity: value.quantity,
      })
    );
  };

  const handleDeleteProduct = () => {
    dispatch(deleteItem(id));
  };

  return (
    <li key={id} className={classes.root}>
      <figure className={classes.image}>
        <img src={thumbnail} />
      </figure>
      <div className={classes.infor}>
        <Typography variant="h4" className={classes.name}>
          {product.name}
        </Typography>
        <Typography variant="h5">
          <span className={classes.price}>{formatPrices}</span>
          <span className={classes.quantity}>x {formatQuantity}</span>
        </Typography>
        <Button
          variant="contained"
          size="small"
          color="primary"
          onClick={handleDeleteProduct}
          className={classes.button}
          endIcon={<BackspaceIcon />}>
          Delete
        </Button>
      </div>
      <form onSubmit={form.handleSubmit(handleSubmit)} className={classes.form}>
        <QuantityField name="quantity" form={form} variant="filled" id={id} />
      </form>
    </li>
  );
}

export default CartItem;
