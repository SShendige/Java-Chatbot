import axios from 'axios';

const API_URL = 'http://35.200.145.103:8000/api/chat'; // Flask backend URL

export const chatService = {
  sendMessage: async (message) => {
    try {
      const response = await axios.post(API_URL, { message });
      console.log("Backend response:", response);
      return response.data.response;  // Extract the response from the API
    } catch (error) {
      console.error("Error from backend:", error);
      if (error.response) {
        if (error.response.status === 400) {
          throw new Error("Please ask a Java-related question.");
        } else if (error.response.status === 503) {
          throw new Error("AI service is currently unavailable. Please try again later.");
        }
      }
      throw new Error("An unexpected error occurred. Please try again.");
    }
  },

  getInitialMessages: async () => {
    return [];  // Empty for now, can be populated if needed
  },
};
