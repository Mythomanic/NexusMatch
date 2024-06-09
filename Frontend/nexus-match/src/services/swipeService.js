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
    return response.data;
  } catch (error) {
    console.error("Error swiping job:", error);
    throw error;
  }
};

const checkMatch = async (userId, jobId) => {
  const headers = authService.authHeader();
  try {
    const response = await axios.get(
      `${API_URL}matches/check?user_id=${userId}&job_id=${jobId}`,
      { headers }
    );
    return response.data.isMatch;
  } catch (error) {
    console.error("Error checking match:", error);
    throw error;
  }
};

export default {
  swipeJob,
  checkMatch,
};
