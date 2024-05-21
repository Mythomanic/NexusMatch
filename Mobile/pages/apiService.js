import axios from 'axios';

const BASE_URL = 'https://nexusmain.onrender.com/api'; // Adjust the base URL according to your API structure

// Function to handle user signup
export const signup = async (name, email, password, password_confirmation) => {
  try {
    const response = await axios.post(`${BASE_URL}/auth/register`, {
      name,
      email,
      password,
      password_confirmation,
    });
    return response.data;
  } catch (error) {
    if (error.response) {
      // Server responded with a status other than 200 range
      console.log('Error Response:', error.response.data);
      return error.response.data;
    } else if (error.request) {
      // Request was made but no response received
      console.log('Error Request:', error.request);
      return { status: false, message: 'No response from server' };
    } else {
      // Something happened in setting up the request
      console.log('Error Message:', error.message);
      return { status: false, message: error.message };
    }
  }
};

// Function to handle user login
export const login = async (email, password) => {
  try {
    const response = await axios.post(`${BASE_URL}/auth/login`, {
      email,
      password,
    });
    return response.data;
  } catch (error) {
    if (error.response) {
      // Server responded with a status other than 200 range
      console.log('Error Response:', error.response.data);
      return error.response.data;
    } else if (error.request) {
      // Request was made but no response received
      console.log('Error Request:', error.request);
      return { status: false, message: 'No response from server' };
    } else {
      // Something happened in setting up the request
      console.log('Error Message:', error.message);
      return { status: false, message: error.message };
    }
  }
};