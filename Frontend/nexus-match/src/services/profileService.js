import axios from "axios";
import authService from "./authService";

const API_URL = "https://nexusmain.onrender.com/api/update-profile/";

const updateName = async (userId, name) => {
  const headers = authService.authHeader();
  try {
    const response = await axios.put(
      `${API_URL}edit-name/${userId}`,
      { name },
      { headers }
    );
    return response.data;
  } catch (error) {
    console.error("Error updating name:", error);
    throw error;
  }
};

const updateEmail = async (userId, email) => {
  const headers = authService.authHeader();
  try {
    const response = await axios.put(
      `${API_URL}edit-email/${userId}`,
      { email },
      { headers }
    );
    return response.data;
  } catch (error) {
    console.error("Error updating email:", error);
    throw error;
  }
};

const updatePassword = async (userId, password, password_confirmation) => {
  const headers = authService.authHeader();
  try {
    const response = await axios.put(
      `${API_URL}edit-password/${userId}`,
      { password, password_confirmation },
      { headers }
    );
    return response.data;
  } catch (error) {
    console.error("Error updating password:", error);
    throw error;
  }
};

const addTag = async (userId, tag) => {
  const headers = authService.authHeader();
  try {
    const response = await axios.put(
      `${API_URL}add-tag/${userId}`,
      { tag },
      { headers }
    );
    return response.data;
  } catch (error) {
    console.error("Error adding tag:", error);
    throw error;
  }
};

const removeTag = async (userId, tag) => {
  const headers = authService.authHeader();
  try {
    const response = await axios.delete(`${API_URL}remove-tag/${userId}/tag`, {
      data: { tag },
      headers,
    });
    return response.data;
  } catch (error) {
    console.error("Error removing tag:", error);
    throw error;
  }
};

const getTags = async (userId) => {
  const headers = authService.authHeader();
  try {
    const response = await axios.get(
      `https://nexusmain.onrender.com/api/user/${userId}/tags`,
      { headers }
    );
    return response.data.tags;
  } catch (error) {
    console.error("Error fetching tags:", error);
    throw error;
  }
};

const getJobProfile = async (userId) => {
  const headers = authService.authHeader();
  try {
    const response = await axios.get(
      `https://nexusmain.onrender.com/api/user/${userId}/job-profile`,
      { headers }
    );
    const jobProfile = response.data.jobProfile;
    localStorage.setItem("jobProfile", JSON.stringify(jobProfile));
    return jobProfile;
  } catch (error) {
    console.error("Error fetching job profile:", error);
    throw error;
  }
};

export default {
  updateName,
  updateEmail,
  updatePassword,
  addTag,
  removeTag,
  getTags,
  getJobProfile,
};
