import axios from "axios";
import authService from "./authService";

const API_URL = "https://nexusmain.onrender.com/api/";

const createDate = async (dateData) => {
  const headers = authService.authHeader();
  try {
    const response = await axios.post(`${API_URL}dates`, dateData, { headers });
    return response.data;
  } catch (error) {
    throw error;
  }
};

const getUserDates = async (userId) => {
  const headers = authService.authHeader();
  try {
    const response = await axios.get(`${API_URL}user/${userId}/dates`, {
      headers,
    });
    return response.data;
  } catch (error) {
    throw error;
  }
};

const getUnseenDates = async (userId) => {
  const headers = authService.authHeader();
  try {
    const response = await axios.get(
      `${API_URL}user/${userId}/dateOpportunities`,
      { headers }
    );
    return response.data; 
  } catch (error) {
    throw error;
  }
};

const getLikedUsers = async (dateId) => {
  const headers = authService.authHeader();
  try {
    const response = await axios.get(`${API_URL}date/${dateId}/likes`, {
      headers,
    });
    return response.data;
  } catch (error) {
    throw error;
  }
};

const likeApplicant = async (dateId, applicantId) => {
  const headers = authService.authHeader();
  try {
    const response = await axios.post(
      `${API_URL}dates/${dateId}/move-user/${applicantId}`,
      {},
      { headers }
    );
    return response.data;
  } catch (error) {
    throw error;
  }
};

const swipeDate = async (userId, dateId, direction) => {
  const headers = authService.authHeader();
  try {
    const response = await axios.post(
      `${API_URL}user/${userId}/dates/${dateId}/swipeDate`,
      { direction },
      { headers }
    );
    return response.data;
  } catch (error) {
    throw error;
  }
};

const dateService = {
  createDate,
  getUserDates,
  getUnseenDates,
  getLikedUsers,
  likeApplicant,
  swipeDate,
};

export default dateService;
