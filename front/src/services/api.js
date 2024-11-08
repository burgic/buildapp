// src/services/api.js

import axios from 'axios';

// Create an Axios instance with a base URL
const API = axios.create({
  baseURL: process.env.REACT_APP_API_URL || 'http://localhost:5000/api', // Set base URL for the API
  headers: {
    'Content-Type': 'application/json',
  },
});

// Add an interceptor to attach token if needed (e.g., for authentication)
API.interceptors.request.use((config) => {
  const token = localStorage.getItem('jwtToken');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

API.interceptors.response.use(
    (response) => response,
    (error) => {
      if (error.response?.status === 401) {
        // Handle unauthorized access
        localStorage.removeItem('jwtToken');
        window.location.href = '/login';
      }
      return Promise.reject(error);
    }
  );
  

export default API;
