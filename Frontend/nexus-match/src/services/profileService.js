import axios from "axios";
import authService from "./authService";

const API_URL = "https://nexus1.onrender.com/api/update-profile/";

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

const updatePassword = async (userId, password) => {
  const headers = authService.authHeader();
  try {
    const response = await axios.put(
      `${API_URL}edit-password/${userId}`,
      { password },
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

export default {
  updateName,
  updateEmail,
  updatePassword,
  addTag,
};
