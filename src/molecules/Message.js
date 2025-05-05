import React from 'react';
import { Box, Typography, Paper } from '@mui/material';

export const Message = ({ text, isUser }) => {
  return (
    <Box
      sx={{
        display: 'flex',
        justifyContent: isUser ? 'flex-end' : 'flex-start',
        mb: 1.5,
      }}
    >
      <Paper
        elevation={0}
        sx={{
          p: 1.5,
          backgroundColor: isUser ? '#F0BB78' : '#DDEB9D',
          fontFamily: "Courier",
          maxWidth: '70%',
          borderRadius: '18px',
          borderBottomRightRadius: isUser ? '4px' : '18px',
          borderBottomLeftRadius: isUser ? '18px' : '4px',
        }}
      >
        <Typography variant="body2" sx = {{fontFamily: "Courier"}}>{text}</Typography>
      </Paper>
    </Box>
  );
};