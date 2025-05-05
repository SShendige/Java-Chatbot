import React from 'react';
import { TextField } from '@mui/material';

export const Input = ({ label, value, onChange, ...props }) => {
  return (
    <TextField
      label={label}
      variant="outlined"
      fullWidth
      value={value}
      onChange={onChange}
      {...props}
    />
  );
};