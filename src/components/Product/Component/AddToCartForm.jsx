import {yupResolver} from '@hookform/resolvers/yup';
import {
  Button,
  LinearProgress,
  makeStyles,
  Typography,
} from '@material-ui/core';
import ShoppingCartIcon from '@material-ui/icons/ShoppingCart';
import InputField from 'components/InputField';
import React from 'react';
import {useForm} from 'react-hook-form';
import * as yup from 'yup';

const useStyles = makeStyles((theme) => ({
  input: {
    '& div': {
      marginBottom: theme.spacing(1),
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
      .min(1, 'Ít nhất một sản phẩm')
      .test('so luong san pham', 'vui long nhap so luong san pham', (value) => {
        return value != '';
      }),
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
      <Typography className={classes.title}>Số lượng</Typography>

      <InputField name="quantity" form={form} variant={'standard'} />

      <Button
        fullWidth
        color="primary"
        variant="contained"
        type="submit"
        endIcon={<ShoppingCartIcon />}>
        Buy
      </Button>
      {isSubmitting && <LinearProgress />}
    </form>
  );
}

export default AddToCartForm;
