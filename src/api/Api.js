import axios from 'axios';
import { BASE_API_URL } from '../utilities/helper';

// Create an instance with specific base api url and headers
const Api = () => {
  const instance = axios.create({
    baseURL: BASE_API_URL,
    timeout: 5000,
    headers: {
      'Content-Type': 'application/json'
    }
  });

  // Add a response interceptor to instance
  instance.interceptors.response.use(
    response => {
      return response;
    },
    error => {
      return Promise.reject(error);
    }
  );
  return instance;
};

export default Api;
