import axios from 'axios';

var api = axios.create({
  baseURL: process.env.REACT_APP_RANDOM_USER_EP,
  headers: {
    'Content-Type': 'application/json',
    Accept: 'application/json',
  },
});

export default api;
