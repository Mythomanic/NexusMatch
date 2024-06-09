import axios from "axios";
import authService from "./authService";

const API_URL = "https://nexusmain.onrender.com/api/";

const getAllUsers = async () => {
  const headers = authService.authHeader();
  try {
    const response = await axios.get(`${API_URL}user`, { headers });
    console.log("Users fetched:", response.data);
    return response.data;
  } catch (error) {
    console.error("Error fetching users:", error);
    throw error;
  }
};

export default {
  getAllUsers,
};
