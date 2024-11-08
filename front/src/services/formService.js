// src/services/formService.js

import API from './api';

// Function to save personal details to the backend
export const savePersonalDetails = async (personalDetails) => {
  try {
    const response = await API.post('/client/personal-details', personalDetails);
    return response.data;
  } catch (error) {
    console.error('Error saving personal details:', error);
    throw error;
  }
};

// Function to get saved data for review purposes
export const getClientDetails = async () => {
  try {
    const response = await API.get('/client/details');
    return response.data;
  } catch (error) {
    console.error('Error fetching client details:', error);
    throw error;
  }
};

// Add other functions for different sections as needed
export const saveEmploymentDetails = async (employmentDetails) => {
  try {
    const response = await API.post('/client/employment-details', employmentDetails);
    return response.data;
  } catch (error) {
    console.error('Error saving employment details:', error);
    throw error;
  }
};
