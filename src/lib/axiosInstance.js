import axios from 'axios';

const axiosInstance = axios.create({
   baseURL: 'http://localhost:3001', // Đặt base URL của API
   headers: {
      'Content-Type': 'application/json',
   },
});

export default axiosInstance;
