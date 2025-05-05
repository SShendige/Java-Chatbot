import React, { useState } from 'react';
import { Box } from '@mui/material';
import { Input } from '../atoms/Input';
import { Button } from '../atoms/Button';

export const ChatInput = ({ onSend, disabled }) => {
  const [message, setMessage] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    if (message.trim()) {
      onSend(message);
      setMessage('');
    }
  };

  return (
    <Box component="form" onSubmit={handleSubmit} sx={{ display: 'flex', gap: 2 }}>
      <Input
        label="Ask about Java"
        value={message}
        onChange={(e) => setMessage(e.target.value)}
        fullWidth
        fontFamily = 'Courier'
      />
      <Button type="submit" disabled={disabled}>Send</Button>
    </Box>
  );
};