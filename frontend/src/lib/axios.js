import axios from 'axios';

const fallbackURL = "https://inventory-management-system-s89n.onrender.com";

let rawURL = process.env.REACT_APP_BACKEND_URL || fallbackURL;
rawURL = rawURL.replace(/\/$/, "");
const baseURL = rawURL.endsWith("/api") ? rawURL : `${rawURL}/api`;

const axiosInstance = axios.create({
  baseURL: baseURL,
  withCredentials: true,
});

// 🟢 ADDED: Automatically send Bearer token in headers for all requests
axiosInstance.interceptors.request.use((config) => {
  const token = localStorage.getItem("token");
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

export default axiosInstance;
