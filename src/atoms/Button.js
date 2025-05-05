import React from 'react';
import { Button as MuiButton } from '@mui/material';
import SendIcon from '@mui/icons-material/Send';

export const Button = ({ children, ...props }) => {
  return (
    <MuiButton
      variant="contained"
      color="primary"
      endIcon={<SendIcon />}
      {...props}
    >
      {children}
    </MuiButton>
  );
};
