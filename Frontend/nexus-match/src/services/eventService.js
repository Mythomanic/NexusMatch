import axios from "axios";
import authService from "./authService";

const API_URL = "https://nexusmain.onrender.com/api";

const getEvents = async () => {
  const headers = authService.authHeader();
  try {
    const response = await axios.get(`${API_URL}/events`, { headers });
    return response.data;
  } catch (error) {
    console.error("Error fetching events:", error);
    throw error;
  }
};

const getEventById = async (id) => {
  const headers = authService.authHeader();
  try {
    const response = await axios.get(`${API_URL}/events/${id}`, { headers });
    return response.data;
  } catch (error) {
    console.error("Error fetching event by id:", error);
    throw error;
  }
};

const createEvent = async (eventData) => {
  const headers = authService.authHeader();
  try {
    const response = await axios.post(`${API_URL}/events`, eventData, {
      headers,
    });
    return response.data;
  } catch (error) {
    console.error("Error creating event:", error);
    throw error;
  }
};

const updateEvent = async (id, eventData) => {
  const headers = authService.authHeader();
  try {
    const response = await axios.put(`${API_URL}/events/${id}`, eventData, {
      headers,
    });
    return response.data;
  } catch (error) {
    console.error("Error updating event:", error);
    throw error;
  }
};

const deleteEvent = async (eventId) => {
  const headers = authService.authHeader();
  try {
    const response = await axios.delete(`${API_URL}/events/${eventId}`, {
      headers,
    });
    return response.data;
  } catch (error) {
    console.error("Error deleting event:", error);
    throw error;
  }
};

const getEventsByUser = async (userId) => {
  const headers = authService.authHeader();
  try {
    const response = await axios.get(`${API_URL}/user/${userId}/events`, {
      headers,
    });
    return response.data.events; // API yanıtının doğruluğunu kontrol edin
  } catch (error) {
    console.error("Error fetching events by user:", error);
    throw error;
  }
};

const getLikedUsers = async (eventId) => {
  const headers = authService.authHeader();
  try {
    const response = await axios.get(`${API_URL}/event/${eventId}/likes`, {
      headers,
    });
    return response.data; // Ensure this matches the structure returned by the backend
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

const getUnseenEvents = async (userId) => {
  const headers = authService.authHeader();
  try {
    console.log(`Fetching unseen events for user ID: ${userId}`);
    const response = await axios.get(
      `${API_URL}/user/${userId}/eventOpportunities`,
      {
        headers,
      }
    );
    console.log("API response:", response.data);
    return response.data; // Burada doğrudan response.data döndürülüyor
  } catch (error) {
    console.error("Error fetching unseen events:", error);
    throw error;
  }
};

export default {
  getEvents,
  getEventById,
  createEvent,
  updateEvent,
  deleteEvent,
  getEventsByUser,
  getLikedUsers,
  moveUserFromLikesToDislikes,
  getUnseenEvents,
};
