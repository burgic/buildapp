import axios from 'axios';

// First, make sure axios is installed:
// npm install axios

// Determine the base URL based on environment
const getBaseUrl = () => {
  if (process.env.NODE_ENV === 'production') {
    return 'https://test-app-1042-deb2a2c51c8e.herokuapp.com/api';
  }
  return 'http://localhost:5000/api';
};

// Create axios instance
const apiClient = axios.create({
  baseURL: getBaseUrl(),
  withCredentials: true,
  timeout: 30000,
  headers: {
    'Content-Type': 'application/json',
  }
});

// Request interceptor
apiClient.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('token');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Response interceptor
apiClient.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response) {
      switch (error.response.status) {
        case 401:
          localStorage.removeItem('token');
          window.location.href = '/login';
          break;
        case 404:
          console.error('Resource not found:', error.config.url);
          break;
        case 500:
          console.error('Server error:', error.response.data);
          break;
        default:
          console.error('API error:', error);
      }
    }
    return Promise.reject(error);
  }
);

// API endpoints
export const api = {
  // Auth endpoints
  login: (credentials) => apiClient.post('/auth/login', credentials),
  logout: () => apiClient.post('/auth/logout'),
  googleAuth: () => `${getBaseUrl()}/auth/google`,

  // Personal Details
  savePersonalDetails: (data) => apiClient.post('/client/personal-details', data),
  getPersonalDetails: () => apiClient.get('/client/personal-details'),

  // Employment
  saveEmploymentDetails: (data) => apiClient.post('/client/employment-details', data),
  getEmploymentDetails: () => apiClient.get('/client/employment-details'),

  // Financial Details
  savePensionDetails: (data) => apiClient.post('/client/pension-details', data),
  getPensionDetails: () => apiClient.get('/client/pension-details'),

  saveIncomeDetails: (data) => apiClient.post('/client/income-details', data),
  getIncomeDetails: () => apiClient.get('/client/income-details'),

  saveExpenseDetails: (data) => apiClient.post('/client/expense-details', data),
  getExpenseDetails: () => apiClient.get('/client/expense-details'),

  saveSavingsInvestments: (data) => apiClient.post('/client/savings-investments', data),
  getSavingsInvestments: () => apiClient.get('/client/savings-inve