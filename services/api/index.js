import axios from 'axios';
import Cookies from 'js-cookie';

// craete setup api with headers for authorization
const API = axios.create({
  baseURL: 'http://localhost:3000/api/',
  headers: {
    Authorization: `Bearer ${Cookies.get('token') || ''}`,
  },
});

export default API;
