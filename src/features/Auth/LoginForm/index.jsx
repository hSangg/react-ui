import {yupResolver} from '@hookform/resolvers/yup';
import {Avatar, Button, makeStyles, Typography, LinearProgress} from '@material-ui/core';
import {AccountCircle} from '@material-ui/icons';
import ArrowUpwardIcon from '@material-ui/icons/ArrowUpward';
import InputField from 'components/InputField';
import PasswordField from 'components/PasswordField';
import React from 'react';
import {useForm} from 'react-hook-form';
import * as yup from 'yup';

const useStyles = makeStyles((theme) => ({
  root: {
    position: 'relative',
    padding: '0 1rem 1rem 1rem ',
  },
  avatar: {
    marginTop: '10px',
    marginLeft: 'auto',
    marginRight: 'auto',
    color: theme.palette.primary.main,
    backgroundColor: 'rgba(0, 0, 0, 0.1)',
  },
  text: {
    textAlign: 'center',
    margin: theme.spacing(1, 0, 2, 0),
  },
  button: {
    marginTop: theme.spacing(2),
  },
  form: {
    position: 'relative',
  },
  loading: {
    position: 'absolute',
    bottom: '-8px',
    left: '0px',
    right: '0px',
  },
}));

function LoginForm({onSubmit}) {
  const schema = yup.object().shape({
    identifier: yup.string().required('Plase enter your email').email('Should be an email'),
    password: yup.string().required('Please enter your password'),
  });

  const classes = useStyles();

  const form = useForm({
    defaultValues: {
      identifier: '',
      password: '',
    },
    resolver: yupResolver(schema),
  });

  const {isSubmitting} = form.formState;

  const handleSubmit = async (value) => {
    if (onSubmit) await onSubmit(value);
  };

  return (
    <div className={classes.root}>
      <Avatar className={classes.avatar}>
        <AccountCircle fontSize="large" />
      </Avatar>

      <Typography variant="h5" className={classes.text}>
        Sign in
      </Typography>

      <form onSubmit={form.handleSubmit(handleSubmit)} className={classes.form}>
        <InputField form={form} name="identifier" label="Email" />
        <PasswordField form={form} name="password" label="Password" />

        <Button
          disabled={isSubmitting}
          className={classes.button}
          fullWidth
          color="primary"
          variant="contained"
          type="submit"
          endIcon={<ArrowUpwardIcon />}>
          Sign in
        </Button>
        {isSubmitting && <LinearProgress className={classes.loading} />}
      </form>
    </div>
  );
}

export default LoginForm;
