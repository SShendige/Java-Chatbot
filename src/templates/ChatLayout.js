import React from 'react';
import { Box, Container, Typography, CircularProgress } from '@mui/material';
import { ChatHistory } from '../organisms/ChatHistory';
import { ChatInput } from '../organisms/ChatInput';

export const ChatLayout = ({ messages, onSend, isLoading }) => {
  return (
    <Container maxWidth="md" sx={{ height: '100%' }}>
      <Box sx={{ 
        my: 4,
        display: 'flex',
        flexDirection: 'column',
        height: 'calc(100vh - 100px)',
        maxHeight: '800px'
      }}>
        <Typography variant="h4" component="h1" gutterBottom fontFamily = "Comic Sans MS">
          Java Expert Chatbot
        </Typography>
        <Typography variant="subtitle1" gutterBottom sx={{ mb: 2, fontFamily: "Comic Sans MS" }}>
          Ask me anything about Java programming. I won't respond to other topics.
        </Typography>
        
        <ChatHistory messages={messages} />
        
        {isLoading && (
          <Box sx={{ 
            display: 'flex', 
            justifyContent: 'center', 
            my: 1,
            height: '40px'
          }}>
            <CircularProgress size={24} />
          </Box>
        )}
        
        <Box sx={{ mt: 'auto', pt: 2 }}>
          <ChatInput onSend={onSend} disabled={isLoading} />
        </Box>
      </Box>
    </Container>
  );
};