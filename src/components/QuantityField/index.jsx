import {FormHelperText, IconButton} from '@material-ui/core';
import FormControl from '@material-ui/core/FormControl';
import InputLabel from '@material-ui/core/InputLabel';
import OutlinedInput from '@material-ui/core/OutlinedInput';
import {RemoveCircleOutline} from '@material-ui/icons';
import {makeStyles} from '@material-ui/styles';
import PropTypes from 'prop-types';
import AddCircleOutlineIcon from '@material-ui/icons/AddCircleOutline';
import React, {useState} from 'react';
import {Controller} from 'react-hook-form';
import {useDispatch} from 'react-redux';
import {setQuantity} from 'components/Cart/cartSlice';

QuantityField.propTypes = {
  form: PropTypes.object,
  name: PropTypes.string.isRequired,

  label: PropTypes.string,
  disabled: PropTypes.bool,
};

const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
    marginBottom: theme.spacing(2),
    '& button': {
      color: '#fff',
    },
    '& fieldset': {
      borderColor: 'rgb(255 255 255 / 90%)',
    },
  },
  input: {
    margin: 0,
  },
}));

function QuantityField({form, name, label, id = 0}) {
  const {errors, setValue} = form;
  const hasError = errors[name];
  const dispatch = useDispatch();
  const classes = useStyles();
  return (
    <FormControl
      error={!!hasError}
      variant="outlined"
      fullWidth
      margin="dense"
      size="small">
      <InputLabel htmlFor={name}>{label}</InputLabel>

      <Controller
        control={form.control}
        id={name}
        name={name}
        label={label}
        render={({onChange, onBlur, value}) => (
          <div className={classes.root}>
            <IconButton
              onClick={() => {
                setValue(name, Number.parseInt(value - 1) || 1);
                dispatch(setQuantity({id, quantity: value - 1}));
              }}>
              <RemoveCircleOutline />
            </IconButton>
            <OutlinedInput
              className={classes.input}
              onChange={onChange}
              onBlur={onBlur}
              value={value}
            />
            <IconButton
              onClick={() => {
                setValue(name, Number.parseInt(value + 1));
                dispatch(setQuantity({id, quantity: value + 1}));
              }}>
              <AddCircleOutlineIcon />
            </IconButton>
          </div>
        )}
      />

      <FormHelperText>{errors[name]?.message}</FormHelperText>
    </FormControl>
  );
}

export default QuantityField;
