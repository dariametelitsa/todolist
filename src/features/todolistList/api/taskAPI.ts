import { instance } from 'common/instance/instance';
import { BaseResponse } from 'common/types';
import { AxiosResponse } from 'axios';
import { AddTaskArgs, DeleteTaskArgs, ResponseTypeGetTask, Task, UpdateTaskModelType } from './taskAPI.types';
import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

export const taskApi = createApi({
  reducerPath: 'taskApi',
  baseQuery: fetchBaseQuery({
    baseUrl: 'https://social-network.samuraijs.com/api/1.1'.toString(),
    credentials: 'include',
    prepareHeaders: (headers) => {
      headers.set('API-KEY', `${process.env.REACT_APP_API_KEY}`);
      headers.set('Authorization', `Bearer ${process.env.REACT_APP_AUTH_TOKEN}`);
    },
  }),
  endpoints: (builder) => ({
    getTask: builder.query<ResponseTypeGetTask, string>({
      query: (todolistId) => ({ url: `/todo-lists/${todolistId}/tasks` }),
    }),
  }),
});

export const { useGetTaskQuery } = taskApi;

export const taskAPI = {
  // getTasks: (todolistId: string) => {
  //   return instance.get<ResponseTypeGetTask>(`/todo-lists/${todolistId}/tasks`);
  // },
  addTask: (arg: AddTaskArgs) => {
    const { todolistId, title } = arg;
    return instance.post<BaseResponse<{ item: Task }>, AxiosResponse<BaseResponse<{ item: Task }>>>(
      `/todo-lists/${todolistId}/tasks`,
      { todolistId: todolistId, title }
    );
  },
  deleteTask: (arg: DeleteTaskArgs) => {
    const { todolistId, taskId } = arg;
    return instance.delete<BaseResponse, AxiosResponse<BaseResponse>>(`/todo-lists/${todolistId}/tasks/${taskId}`);
  },
  updateTask: (todoId: string, taskId: string, model: UpdateTaskModelType) => {
    return instance.put<BaseResponse<{ item: Task }>, AxiosResponse<BaseResponse<{ item: Task }>>>(
      `/todo-lists/${todoId}/tasks/${taskId}`,
      { ...model }
    );
  },
};
