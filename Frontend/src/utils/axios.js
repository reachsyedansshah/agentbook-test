// utils/axios.js
import axios from 'axios';
import Cookies from 'js-cookie';

const API = axios.create({ baseURL: 'http://localhost:4001/api' });

// Intercept requests to include token
API.interceptors.request.use((req) => {
  const token = Cookies.get('token');
  if (token) {
    req.headers.Authorization = `Bearer ${token}`;
  }
  return req;
});

export default API;
