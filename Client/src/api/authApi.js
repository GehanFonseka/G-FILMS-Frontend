import axios from "axios";

const API_URL = "https://g-films.onrender.com/api/v1/auth";

// Register API Call
export const registerUser = async (userData) => {
  try {
    const response = await axios.post(`${API_URL}/register`, userData);
    return response.data; // Success message
  } catch (error) {
    throw error.response ? error.response.data : error.message;
  }
};

// Login API Call
export const loginUser = async (userData) => {
  try {
    const response = await axios.post(`${API_URL}/login`, userData);
    return response.data; // JWT token
  } catch (error) {
    throw error.response ? error.response.data : error.message;
  }
};
