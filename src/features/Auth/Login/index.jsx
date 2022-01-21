import {unwrapResult} from '@reduxjs/toolkit';
import {useSnackbar} from 'notistack';
import React from 'react';
import {useDispatch} from 'react-redux';
import LoginForm from '../LoginForm';
import {login} from '../userSlice';

function Login({onClose}) {
  const {enqueueSnackbar} = useSnackbar();
  const dispatch = useDispatch();

  const handleSubmit = async (value) => {
    try {
      //auto add username = email
      value.username = value.email;
      const action = login(value);
      const resultAction = await dispatch(action);
      const user = unwrapResult(resultAction);
      //success
      onClose();
    } catch (error) {
      enqueueSnackbar(error.message, {variant: 'error'});
      console.log(error);
    }
  };

  return (
    <div>
      <LoginForm onSubmit={handleSubmit} />
    </div>
  );
}

export default Login;
