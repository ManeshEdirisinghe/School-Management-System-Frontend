import axios from "axios";

// Base URL for the backend API
const BASE_URL = "http://localhost:8080/api/v1";

// Create axios instance with default config
const api = axios.create({
  baseURL: BASE_URL,
  headers: {
    "Content-Type": "application/json",
  },
  timeout: 10000, // 10 seconds
});

// Request interceptor (for adding auth tokens, etc.)
api.interceptors.request.use(
  (config) => {
    // You can add authorization tokens here if needed
    // const token = localStorage.getItem('token');
    // if (token) {
    //   config.headers.Authorization = `Bearer ${token}`;
    // }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Response interceptor (for handling common errors)
api.interceptors.response.use(
  (response) => {
    return response;
  },
  (error) => {
    // Handle common errors here
    if (error.response) {
      // Server responded with error status
      console.error("API Error:", error.response.status, error.response.data);
      
      // Handle specific status codes
      if (error.response.status === 401) {
        // Unauthorized - redirect to login
        // window.location.href = '/login';
      }
    } else if (error.request) {
      // Request made but no response received
      console.error("Network Error:", error.message);
    } else {
      // Something else happened
      console.error("Error:", error.message);
    }
    
    return Promise.reject(error);
  }
);

// API endpoints organized by resource
export const endpoints = {
  students: {
    getAll: "/student/getAll",
    getById: (id) => `/student/${id}`,
    create: "/student",
    update: (id) => `/student/${id}`,
    delete: (id) => `/student/${id}`,
  },
  teachers: {
    getAll: "/teacher/getAll",
    getById: (id) => `/teacher/${id}`,
    create: "/teacher",
    update: (id) => `/teacher/${id}`,
    delete: (id) => `/teacher/${id}`,
  },
  classes: {
    getAll: "/class/getAll",
    getById: (id) => `/class/${id}`,
    create: "/class",
    update: (id) => `/class/${id}`,
    delete: (id) => `/class/${id}`,
  },
  dashboard: {
    getStats: "/dashboard/stats",
    getRecentStudents: "/dashboard/recent-students",
    getActivities: "/dashboard/activities",
    getEvents: "/dashboard/events",
    getAttendance: "/dashboard/attendance",
  },
};

export default api;
