// API Configuration with environment variables
export const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || 'http://localhost:5000';
export const SOCKET_URL = import.meta.env.VITE_SOCKET_URL || 'http://localhost:5000';

// Additional API endpoints
export const API_ENDPOINTS = {
  // Auth endpoints
  LOGIN: `${API_BASE_URL}/api/auth/login`,
  REGISTER: `${API_BASE_URL}/api/auth/register`,
  LOGOUT: `${API_BASE_URL}/api/auth/logout`,
  VERIFY_TOKEN: `${API_BASE_URL}/api/auth/verify`,
  
  // User endpoints
  USERS: `${API_BASE_URL}/api/users`,
  PROFILE: `${API_BASE_URL}/api/users/profile`,
  
  // Events endpoints
  EVENTS: `${API_BASE_URL}/api/events`,
  
  // Jobs endpoints
  JOBS: `${API_BASE_URL}/api/jobs`,
  
  // Mentorship endpoints
  MENTORSHIP: `${API_BASE_URL}/api/mentorship`,
  
  // Alumni endpoints
  ALUMNI: `${API_BASE_URL}/api/alumni`,
  
  // Feed endpoints
  FEED: `${API_BASE_URL}/api/feed`,
};

// Socket configuration
export const SOCKET_CONFIG = {
  url: SOCKET_URL,
  options: {
    transports: ['websocket', 'polling'],
    autoConnect: false,
  }
};