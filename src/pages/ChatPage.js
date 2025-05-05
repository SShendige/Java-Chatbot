import React, { useState, useEffect } from 'react';
import { Box } from '@mui/material';
import { ChatLayout } from '../templates/ChatLayout';
import { chatService } from '../services/ChatService';

export const ChatPage = () => {
  const [messages, setMessages] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  // Load initial data (if any)
  useEffect(() => {
    const loadInitialData = async () => {
      try {
        const response = await chatService.getInitialMessages();
        setMessages(response);
      } catch (error) {
        console.error("Failed to load initial messages:", error);
      }
    };

    loadInitialData();
  }, []);

  const handleSend = async (message) => {
    const userMessage = { text: message, isUser: true };
    setMessages(prev => [...prev, userMessage]);
    setIsLoading(true);

    try {
      const data = await chatService.sendMessage(message);  // Get response from Flask API
      const botMessage = { text: data, isUser: false };
      setMessages(prev => [...prev, botMessage]);
    } catch (error) {
      const errorMessage = {
        text: error.message || "I only respond to Java-related questions.",
        isUser: false
      };
      setMessages(prev => [...prev, errorMessage]);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Box sx={{ height: '100vh', display: 'flex', flexDirection: 'column' }}>
      <ChatLayout messages={messages} onSend={handleSend} isLoading={isLoading} />
    </Box>
  );
};
