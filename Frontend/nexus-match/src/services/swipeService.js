import axios from "axios";
import authService from "./authService";

const API_URL = "https://nexus1.onrender.com/api/";

const swipeJob = async (jobId, direction) => {
  const headers = authService.authHeader();
  try {
    const response = await axios.post(
      API_URL + "swipes",
      { job_id: jobId, direction },
      { headers }
    );
    return response.data;
  } catch (error) {
    console.error("Error swiping job:", error);
    throw error;
  }
};

export default {
  swipeJob,
};
