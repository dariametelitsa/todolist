import axios from 'axios';

export const instance = axios.create({
  // baseURL: process.env.REACT_APP_BASE_URL,
  baseURL: 'https://social-network.samuraijs.com/api/1.1',
  withCredentials: true,
  headers: {
    'API-KEY': process.env.REACT_APP_API_KEY,
    Authorization: `Bearer ${process.env.REACT_APP_AUTH_TOKEN}`,
  },
});
