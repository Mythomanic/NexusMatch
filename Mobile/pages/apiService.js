import axios from 'axios';

const BASE_URL = 'https://nexusmain.onrender.com/api'; // Adjust the base URL according to your API structure

// Function to handle user signup
export const signup = async (name, email, password, password_confirmation) => {
  try {
    const response = await fetch(`${BASE_URL}/auth/register`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        name,
        email,
        password,
        password_confirmation,
      }),
    });

    const data = await response.json();

    if (!response.ok) {
      // If response status is not in the 200-299 range, consider it an error
      console.log('Error Response:', data);
      return data;
    }

    return data;
  } catch (error) {
    if (error instanceof TypeError) {
      // Network error or other fetch-related errors
      console.log('Error Request:', error.message);
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
    const response = await fetch(`${BASE_URL}/auth/login`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        email,
        password,
      }),
    });

    const data = await response.json();

    if (!response.ok) {
      // If response status is not in the 200-299 range, consider it an error
      console.log('Error Response:', data);
      return data;
    }

    return data;
  } catch (error) {
    if (error instanceof TypeError) {
      // Network error or other fetch-related errors
      console.log('Error Request:', error.message);
      return { status: false, message: 'No response from server' };
    } else {
      // Something happened in setting up the request
      console.log('Error Message:', error.message);
      return { status: false, message: error.message };
    }
  }
};
