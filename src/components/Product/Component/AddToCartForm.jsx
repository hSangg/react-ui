import {yupResolver} from '@hookform/resolvers/yup';
import {
  Button,
  LinearProgress,
  makeStyles,
  Typography,
} from '@material-ui/core';
import ShoppingCartIcon from '@material-ui/icons/ShoppingCart';
import QuantityField from 'components/QuantityField';
import React from 'react';
import {useForm} from 'react-hook-form';
import * as yup from 'yup';

const useStyles = makeStyles((theme) => ({
  input: {
    '& div': {
      color: '#fff',
    },
  },
  title: {
    marginTop: theme.spacing(2),
  },
}));

function AddToCartForm({onSubmit}) {
  const classes = useStyles();

  const schema = yup.object().shape({
    quantity: yup
      .number()
      .required('Nhập vào số lượng sản phẩm')
      .min(1, 'Ít nhất một sản phẩm')
      .typeError('Nhập vào số lượng sản phẩm'),
  });

  const form = useForm({
    defaultValues: {
      quantity: 1,
    },
    resolver: yupResolver(schema),
  });

  const {isSubmitting} = form.formState;

  const handleSubmit = async (value) => {
    if (onSubmit) await onSubmit(value);
  };

  return (
    <form onSubmit={form.handleSubmit(handleSubmit)} className={classes.input}>
      <Typography className={classes.title}>Số lượng: </Typography>

      <QuantityField name="quantity" form={form} variant={'standard'} />

      <Button
        fullWidth
        color="primary"
        variant="contained"
        type="submit"
        endIcon={<ShoppingCartIcon />}
        style={{width: '323px'}}>
        Buy
      </Button>
      {isSubmitting && <LinearProgress />}
    </form>
  );
}

export default AddToCartForm;
