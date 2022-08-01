import axios from 'axios';

// craete setup api with headers for authorization
const API = axios.create({
  baseURL: "/api/",
  headers: {
    Authorization: `Bearer token`,
  },
});

export default API;
