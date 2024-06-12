import axios from "axios";
import authService from "./authService";

const API_URL = "https://nexusmain.onrender.com/api/";

const sendMessage = async (chatId, message) => {
  const response = await axios.post(
    `${API_URL}chats/${chatId}/messages`,
    { chat_id: chatId, message: message },
    { headers: authService.authHeader() }
  );
  return response.data;
};

const fetchMessages = async (chatId) => {
  const response = await axios.get(`${API_URL}chats/${chatId}/messages`, {
    headers: authService.authHeader(),
  });
  return response.data;
};

export default {
  sendMessage,
  fetchMessages,
};
