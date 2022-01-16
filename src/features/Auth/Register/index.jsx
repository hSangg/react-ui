import {unwrapResult} from '@reduxjs/toolkit';
import {useSnackbar} from 'notistack';
import React from 'react';
import {useDispatch} from 'react-redux';
import RegisterForm from '../RegisterForm';
import {register} from '../userSlice';

function Register({onClose}) {
  const {enqueueSnackbar} = useSnackbar();
  const dispatch = useDispatch();

  const handleSubmit = async (value) => {
    try {
      //auto add username = email
      value.username = value.email;
      const action = register(value);
      const resultAction = await dispatch(action);
      const user = unwrapResult(resultAction);

      //success
      enqueueSnackbar('Successfully', {variant: 'success'});
      onClose();
    } catch (error) {
      enqueueSnackbar(error.message, {variant: 'error'});
      console.log(error);
    }
  };

  return (
    <div>
      <RegisterForm onSubmit={handleSubmit} />
    </div>
  );
}

export default Register;
