import { instance } from 'common/instance/instance';
import { BaseResponse } from 'common/types';
import { AxiosResponse } from 'axios';
import { TodolistType, UpdateTodolistTitle } from './todolistAPI.types';
import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { TodoListDomain } from 'common/data/dataPropsTypes';

export const todolistApi = createApi({
  reducerPath: 'todolistApi',
  baseQuery: fetchBaseQuery({ baseUrl: process.env.REACT_APP_BASE_URL }),
  endpoints: (builder) => ({
    getTodolist: builder.query<Array<TodoListDomain>, void>({
      query: () => ({ url: '/todo-lists' }),
      transformResponse(todolists: TodolistType[]): TodoListDomain[] {
        return todolists.map((td) => ({ ...td, filter: 'all', entityStatus: 'idle' }));
      },
    }),
  }),
});

export const { useGetTodolistQuery } = todolistApi;

export const todolistAPI = {
  // getTodolist: () => {
  //   return instance.get<Array<TodolistType>>('/todo-lists');
  // },
  addTodolist: (title: string) => {
    return instance.post<BaseResponse<{ item: TodolistType }>, AxiosResponse<BaseResponse<{ item: TodolistType }>>>(
      '/todo-lists',
      { title }
    );
  },
  deleteTodolist: (todoId: string) => {
    return instance.delete<BaseResponse, AxiosResponse<BaseResponse>>(`/todo-lists/${todoId}`);
  },
  updateTodolist: (arg: UpdateTodolistTitle) => {
    const { todolistId, title } = arg;
    return instance.put<BaseResponse, AxiosResponse<BaseResponse>>(`/todo-lists/${todolistId}`, { title });
  },
};
