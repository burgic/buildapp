import API from './api';

export const loginWithGoogle = () => {
  window.location.href = `${process.env.REACT_APP_API_URL}/auth/google`;
};

export const handleAuthCallback = async (token) => {
  if (token) {
    localStorage.setItem('jwtToken', token);
    return true;
  }
  return false;
};

export const logout = () => {
  localStorage.removeItem('jwtToken');
  window.location.href = '/login';
};