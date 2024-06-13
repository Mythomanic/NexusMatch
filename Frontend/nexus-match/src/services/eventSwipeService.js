import axios from "axios";
import authService from "./authService";

const API_URL = "https://nexusmain.onrender.com/api";

const swipeEvent = async (userId, eventId, direction) => {
  const headers = authService.authHeader();
  try {
    const response = await axios.post(
      `${API_URL}/user/${userId}/events/${eventId}/swipeEvent`,
      { direction },
      { headers }
    );
    return response.data;
  } catch (error) {
    console.error("Error swiping event: ", error);
    throw error;
  }
};

const getLikedUsers = async (eventId) => {
  const headers = authService.authHeader();
  try {
    const response = await axios.get(`${API_URL}/event/${eventId}/likes`, {
      headers,
    });
    return response.data;
  } catch (error) {
    console.error("Error fetching liked users:", error);
    throw error;
  }
};

const moveUserFromLikesToDislikes = async (eventId, userId) => {
  const headers = authService.authHeader();
  try {
    const response = await axios.post(
      `${API_URL}/events/${eventId}/move-user/${userId}`,
      {},
      { headers }
    );
    return response.data;
  } catch (error) {
    console.error("Error moving user from likes to dislikes:", error);
    throw error;
  }
};

export default {
  swipeEvent,
  getLikedUsers,
  moveUserFromLikesToDislikes,
};
