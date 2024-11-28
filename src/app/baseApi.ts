import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

export const baseApi = createApi({
  reducerPath: 'todolistApi',
  baseQuery: fetchBaseQuery({
    baseUrl: 'https://social-network.samuraijs.com/api/1.1'.toString(),
    credentials: 'include',
    prepareHeaders: (headers) => {
      headers.set('API-KEY', `${process.env.REACT_APP_API_KEY}`);
      headers.set('Authorization', `Bearer ${process.env.REACT_APP_AUTH_TOKEN}`);
    },
  }),
  endpoints: () => ({}),
  tagTypes: ['Todolist'],
});
