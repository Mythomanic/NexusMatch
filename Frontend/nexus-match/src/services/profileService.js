import axios from "axios";
import authService from "./authService";

const API_URL = "https://nexusmain.onrender.com/api/";

const updateUserProfile = async (userId, updateData) => {
  const headers = authService.authHeader();
  try {
    const response = await axios.put(
      `${API_URL}user/${userId}/update-profile`,
      updateData,
      {
        headers,
      }
    );
    return response.data;
  } catch (error) {
    console.error("Error updating user profile:", error);
    throw error;
  }
};

const getJobProfile = async (userId) => {
  const headers = authService.authHeader();
  try {
    const response = await axios.get(`${API_URL}user/${userId}/job-profile`, {
      headers,
    });
    const jobProfile = response.data.jobProfile;
    localStorage.setItem("jobProfile", JSON.stringify(jobProfile));
    return jobProfile;
  } catch (error) {
    console.error("Error fetching job profile:", error);
    throw error;
  }
};

const updateUserAvatar = async (userId, formData) => {
  const headers = authService.authHeader();
  headers["Content-Type"] = "multipart/form-data";
  try {
    const response = await axios.post(
      `${API_URL}user/${userId}/update-avatar-job`,
      formData,
      { headers }
    );
    return response.data;
  } catch (error) {
    console.error("Error updating user avatar:", error);
    throw error;
  }
};

export default {
  updateUserProfile,
  getJobProfile,
  updateUserAvatar,
};
