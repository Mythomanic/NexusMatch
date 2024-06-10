import axios from "axios";
import authService from "./authService";

const API_URL = "https://nexusmain.onrender.com/api/";

const createMatch = async (user_id, job_id) => {
  const headers = authService.authHeader();
  try {
    const response = await axios.post(
      API_URL + "matches",
      { user_id, job_id },
      { headers }
    );
    return response.data;
  } catch (error) {
    console.error("Error creating match:", error);
    throw error;
  }
};

const checkMatch = async (user_id, job_id) => {
  const headers = authService.authHeader();
  try {
    const response = await axios.get(
      API_URL + `matches/check?user_id=${user_id}&job_id=${job_id}`,
      { headers }
    );
    return response.data.isMatch;
  } catch (error) {
    console.error("Error checking match:", error);
    throw error;
  }
};

export default {
  createMatch,
  checkMatch,
};
