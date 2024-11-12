// src/services/apiClient.js
import axios from 'axios';

// Determine the base URL based on environment
const getBaseUrl = () => {
  if (process.env.NODE_ENV === 'production') {
    return 'https://test-app-1042.herokuapp.com/api';
  }
  return 'http://localhost:5000/api';
  
};

export const fetchDashboardData = async () => {
    const token = localStorage.getItem('jwtToken');
    const response = await axios.get('https://test-app-1042-deb2a2c51c8e.herokuapp.com/api/admin/dashboard', {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return response.data;
  };

// Create a custom instance of axios
const apiClient = axios.create({
  baseURL: getBaseUrl(),
  withCredentials: true,
  timeout: 30000, // 30 seconds
  headers: {
    'Content-Type': 'application/json',
    'Accept': 'application/json'
  }
});

const debugLog = (message, data) => {
    if (process.env.NODE_ENV === 'development') {
      console.log(`[API Debug] ${message}:`, data);
    }
  };

// Request interceptor for adding auth token and handling requests
apiClient.interceptors.request.use(
  (config) => {
    debugLog('Request Config', config);

    const token = localStorage.getItem('token');
    
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
/*
    // Log request in development
    if (process.env.NODE_ENV === 'development') {
      console.log('API Request:', {
        url: config.url,
        method: config.method,
        headers: config.headers
      });
    }
*/
    if (config.method === 'get') {
        config.params = {
          ...config.params,
          _t: new Date().getTime()
        };
      }
    
    return config;
  },
  (error) => {
    console.error('Request error:', error);
    return Promise.reject(error);
  }
);

// Response interceptor for handling common error cases
apiClient.interceptors.response.use(
  (response) => {
    // Log response in development
    /* if (process.env.NODE_ENV === 'development') {
      console.log('API Response:', {
        url: response.config.url,
        status: response.status,
        data: response.data
      });
    }

    return response;
    */


    debugLog('Response', response);
    return response;
  },
  async (error) => {
    debugLog('Error Response', error);
  },
  async (error) => {
    if (error.response) {
      switch (error.response.status) {
        case 401:
          // Handle unauthorized
          localStorage.removeItem('token');
          window.location.href = '/login';
          break;
        case 403:
        // Handle forbidden
        console.error('Access forbidden');
          break;
        case 404:
          console.error('API endpoint not found:', error.config.url);
          break;
        case 500:
          console.error('Server error:', error.response.data);
          break;
        default:
          console.error('API error:', error.response.status, error.response.data);
      }
    } else if (error.request) {
      console.error('Network error - no response received:', error.request);
    } else {
      console.error('Error:', error.message);
    }
    return Promise.reject(error);
  }
);

// API endpoints
export const api = {

  //  authenticate: (credentials) => apiClient.post('/auth/login', credentials),
  // endSession: () => apiClient.post('/auth/logout'),

  login: (credentials) => apiClient.post('/api/auth/login', credentials),
  logout: () => apiClient.post('/api/auth/logout'),
  
  // Dashboard - renamed from admin
  getDashboardData: () => apiClient.get('/management/dashboard', {
    headers: {
      'Cache-Control': 'no-cache',
      'Pragma': 'no-cache'
    }
  }),
  // Auth endpoints
  googleAuth: () => `${getBaseUrl()}/auth/google`, // Returns full URL for Google OAuth redirect
  
  // Admin endpoints
  getDashboard: () => apiClient.get('/admin/dashboard'),
  inviteClient: (data) => apiClient.post('/admin/invite', data),
  
  // Client endpoints
  savePersonalDetails: (data) => apiClient.post('/client/personal-details', data),
  getPersonalDetails: () => apiClient.get('/client/personal-details'),
  
  // Employment endpoints
  saveEmploymentDetails: (data) => apiClient.post('/client/employment-details', data),
  getEmploymentDetails: () => apiClient.get('/client/employment-details'),
  
  // Financial endpoints
  savePensionDetails: (data) => apiClient.post('/client/pension-details', data),
  getPensionDetails: () => apiClient.get('/client/pension-details'),
  
  saveIncomeDetails: (data) => apiClient.post('/client/income-details', data),
  getIncomeDetails: () => apiClient.get('/client/income-details'),
  
  saveExpenseDetails: (data) => apiClient.post('/client/expense-details', data),
  getExpenseDetails: () => apiClient.get('/client/expense-details'),
  
  saveSavingsInvestments: (data) => apiClient.post('/client/savings-investments', data),
  getSavingsInvestments: () => apiClient.get('/client/savings-investments'),
  
  // Health check
  checkHealth: () => apiClient.get('/health'),
  
  // Workflow
  getWorkflowStatus: () => apiClient.get('/client/workflow-status'),
  updateWorkflowStatus: (data) => apiClient.put('/client/workflow-status', data),
  
  // Form draft
  saveDraft: (formData) => apiClient.post('/client/draft', formData),
  getDraft: () => apiClient.get('/client/draft'),
};

export default {api, apiClient};