import { instance } from 'common/instance/instance';
import { BaseResponse } from 'common/types';
import { AxiosResponse } from 'axios';
import { TodolistType, UpdateTodolistTitle } from './todolistAPI.types';
import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { TodoListDomain } from 'common/data/dataPropsTypes';

export const todolistApi = createApi({
  reducerPath: 'todolistApi',
  baseQuery: fetchBaseQuery({
    baseUrl: 'https://social-network.samuraijs.com/api/1.1'.toString(),
    credentials: 'include',
    prepareHeaders: (headers) => {
      headers.set('API-KEY', `${process.env.REACT_APP_API_KEY}`);
      headers.set('Authorization', `Bearer ${process.env.REACT_APP_AUTH_TOKEN}`);
    },
  }),
  tagTypes: ['Todolist'],
  endpoints: (builder) => ({
    getTodolist: builder.query<Array<TodoListDomain>, void>({
      query: () => ({ url: '/todo-lists' }),
      transformResponse(todolists: TodolistType[]): TodoListDomain[] {
        return todolists.map((td) => ({ ...td, filter: 'all', entityStatus: 'idle' }));
      },
      providesTags: ['Todolist'],
    }),
    addTodolist: builder.mutation<BaseResponse<{ item: TodolistType }>, string>({
      query: (title) => ({ url: '/todo-lists', method: 'POST', body: { title } }),
      invalidatesTags: ['Todolist'],
    }),
    deleteTodolist: builder.mutation<BaseResponse, string>({
      query: (todoId) => ({ url: `/todo-lists/${todoId}`, method: 'DELETE' }),
      invalidatesTags: ['Todolist'],
    }),
    updateTodolist: builder.mutation<BaseResponse, UpdateTodolistTitle>({
      query: (arg) => {
        const { todolistId, title } = arg;
        return {
          url: `/todo-lists/${todolistId}`,
          body: { title },
          method: 'PUT',
        };
      },
      invalidatesTags: ['Todolist'],
    }),
  }),
});

export const { useGetTodolistQuery, useAddTodolistMutation, useDeleteTodolistMutation, useUpdateTodolistMutation } =
  todolistApi;

export const todolistAPI = {
  // getTodolist: () => {
  //   return instance.get<Array<TodolistType>>('/todo-lists');
  // },
  // addTodolist: (title: string) => {
  //   return instance.post<BaseResponse<{ item: TodolistType }>, AxiosResponse<BaseResponse<{ item: TodolistType }>>>(
  //     '/todo-lists',
  //     { title }
  //   );
  // },
  // deleteTodolist: (todoId: string) => {
  //   return instance.delete<BaseResponse, AxiosResponse<BaseResponse>>(`/todo-lists/${todoId}`);
  // },
  // updateTodolist: (arg: UpdateTodolistTitle) => {
  //   const { todolistId, title } = arg;
  //   return instance.put<BaseResponse, AxiosResponse<BaseResponse>>(`/todo-lists/${todolistId}`, { title });
  // },
};
