import axios from "axios";
import authService from "./authService";

const API_URL = "https://nexusmain.onrender.com/api/";

const createChat = async (user2_id) => {
  const headers = authService.authHeader();
  try {
    const response = await axios.post(
      API_URL + "chats",
      { user2_id },
      { headers }
    );
    return response.data;
  } catch (error) {
    console.error("Error creating chat:", error);
    throw error;
  }
};

const fetchChats = async () => {
  const headers = authService.authHeader();
  try {
    const response = await axios.get(API_URL + "chats", { headers });
    return response.data;
  } catch (error) {
    console.error("Error fetching chats:", error);
    throw error;
  }
};

export default {
  createChat,
  fetchChats,
};
