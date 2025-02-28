import axios from 'axios';

//could also use fetch instead of axios
const apiClient = axios.create({
  baseURL: process.env.REACT_APP_API_URL || 'http://localhost:8080/api',
  headers: {
    'Content-Type': 'application/json',
  }
});

export default apiClient;
