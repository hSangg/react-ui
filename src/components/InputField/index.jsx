import React from 'react';
import PropTypes from 'prop-types';
import {Controller} from 'react-hook-form';
import {TextField} from '@material-ui/core';

InputField.propTypes = {
  form: PropTypes.object,
  name: PropTypes.string.isRequired,

  label: PropTypes.string,
  disabled: PropTypes.bool,
};

function InputField({form, name, label, disabled, variant}) {
  const {errors} = form;
  const hasError = errors[name];

  return (
    <Controller
      name={name}
      control={form.control}
      as={TextField}
      fullWidth
      margin="dense"
      label={label}
      disabled={disabled}
      error={!!hasError}
      helperText={errors[name]?.message}
      variant={variant || 'outlined'}
    />
  );
}

export default InputField;
