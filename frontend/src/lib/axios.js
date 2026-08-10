import axios from 'axios';

const fallbackURL = "https://inventory-management-system-s89n.onrender.com";

const axiosInstance = axios.create({
    baseURL: `${process.env.REACT_APP_BACKEND_URL || fallbackURL}/api`,
    withCredentials: true,
  });
  
export default axiosInstance
