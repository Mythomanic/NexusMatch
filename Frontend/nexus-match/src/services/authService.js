import axios from "axios";

const API_URL = "https://nexusmain.onrender.com/api/auth/";

const register = async (username, email, password, passwordConfirmation) => {
  try {
    return await axios.post(API_URL + "register", {
      name: username,
      email,
      password,
      password_confirmation: passwordConfirmation,
    });
  } catch (error) {
    console.error("Registration error:", error.response.data);
    throw error;
  }
};

const login = async (email, password) => {
  try {
    const response = await axios.post(API_URL + "login", {
      email,
      password,
    });
    if (response.data.token) {
      localStorage.setItem("user", JSON.stringify(response.data));
      //başarılıysa buraya yönlendirme yapılacak
      window.location.href = "/";
    }
    return response.data;
  } catch (error) {
    console.error("Login error:", error);
    throw error;
  }
};

const logout = () => {
  localStorage.removeItem("user");
};

const getCurrentUser = () => {
  return JSON.parse(localStorage.getItem("user"));
};

const authHeader = () => {
  const user = JSON.parse(localStorage.getItem("user"));

  if (user && user.token) {
    return { Authorization: "Bearer " + user.token };
  } else {
    return {};
  }
};

export default {
  register,
  login,
  logout,
  getCurrentUser,
  authHeader,
};
