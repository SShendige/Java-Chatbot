import React, { useEffect, useRef } from 'react';
import { Box } from '@mui/material';
import { Message } from '../molecules/Message';

export const ChatHistory = ({ messages }) => {
  const messagesEndRef = useRef(null);

  const scrollToBottom = () => {
    const container = messagesEndRef.current?.parentNode;
    if (container) {
      // Instant scroll if user is near bottom
      const isNearBottom = container.scrollHeight - container.scrollTop <= container.clientHeight + 100;

      if (isNearBottom) {
        messagesEndRef.current?.scrollIntoView({
          behavior: "smooth",
          block: "nearest",
          inline: "start"
        });
      }
    }
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]); // Auto-scroll when messages change

  return (
    <Box sx={{
      height: '60vh',
      overflowY: 'auto',
      mb: 2,
      px: 1,
      '&::-webkit-scrollbar': {
        width: '8px',
      },
      '&::-webkit-scrollbar-thumb': {
        backgroundColor: 'rgba(0,0,0,0.2)',
        borderRadius: '4px',
      },
      '&::-webkit-scrollbar-thumb:hover': {
        backgroundColor: 'rgba(0,0,0,0.4)',
      }
    }}>
      {messages.map((msg, index) => (
        <Message
          key={index}
          text={msg.text}
          isUser={msg.isUser}
        />
      ))}
      <div ref={messagesEndRef} />
    </Box>
  );
};