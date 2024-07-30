import axios from 'axios';

export const instance = axios.create({
  baseURL: 'https://social-network.samuraijs.com/api/1.1',
  withCredentials: true,
  headers: {
    'API-KEY': '1c0d9a02-17ae-40c8-8a16-b7733f0e908d',
  },
});
