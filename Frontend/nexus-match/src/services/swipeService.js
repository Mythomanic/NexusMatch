import axios from "axios";
import authService from "./authService";

const API_URL = "https://nexusmain.onrender.com/api/";

const swipeJob = async (userId, jobId, direction) => {
  const headers = authService.authHeader();
  try {
    const response = await axios.post(
      `${API_URL}user/${userId}/jobs/${jobId}/swipe`,
      { direction },
      { headers }
    );
    console.log("Swipe response:", response.data); // Başarıyla tamamlandığında konsola yazdır
    return response.data;
  } catch (error) {
    console.error("Error swiping job:", error); // Hata durumunda konsola yazdır
    throw error;
  }
};

const checkMatch = async (userId, jobId) => {
  const headers = authService.authHeader();
  try {
    const response = await axios.get(`${API_URL}job/${jobId}/likes`, {
      headers,
    });
    const likedUsers = response.data.likedUsers;
    console.log("Check match response:", likedUsers); // Başarıyla tamamlandığında konsola yazdır
    return likedUsers.some((user) => user.id === userId);
  } catch (error) {
    console.error("Error checking match:", error); // Hata durumunda konsola yazdır
    throw error;
  }
};

const createChat = async (userId, applicantId) => {
  const headers = authService.authHeader();
  try {
    const response = await axios.post(
      `${API_URL}chats`,
      { userId, applicantId },
      { headers }
    );
    return response.data;
  } catch (error) {
    console.error("Error creating chat:", error);
    throw error;
  }
};

export default {
  swipeJob,
  checkMatch,
  createChat,
};
