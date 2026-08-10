import axios from 'axios';

const fallbackURL = "https://inventory-management-system-s89n.onrender.com";

// Base URL ko sanitize karna
let rawURL = process.env.REACT_APP_BACKEND_URL || fallbackURL;

// End se trailing slash (/) hatana
rawURL = rawURL.replace(/\/$/, "");

// Check karna ki /api pehle se hai ya nahi, taaki double /api/api na bane
const baseURL = rawURL.endsWith("/api") ? rawURL : `${rawURL}/api`;

const axiosInstance = axios.create({
  baseURL: baseURL,
  withCredentials: true,
});

export default axiosInstance;
