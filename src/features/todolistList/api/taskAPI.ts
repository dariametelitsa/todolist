import { instance } from 'common/instance/instance';
import { BaseResponse } from 'common/types';
import { AxiosResponse } from 'axios';
import { AddTaskArgs, DeleteTaskArgs, ResponseTypeGetTask, Task, UpdateTaskModelType } from './taskAPI.types';
import { baseApi } from 'app/baseApi';
import { Paths } from 'common/Paths';
import { BaseQueryArg } from '@reduxjs/toolkit/dist/query/baseQueryTypes';

export const taskApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getTask: builder.query<ResponseTypeGetTask, string>({
      query: (todolistId) => ({ url: `${Paths.todolists}/${todolistId}/tasks` }),
    }),
    addTask: builder.mutation<BaseResponse<{ item: Task }>, AddTaskArgs>({
      query: (arg) => {
        const { todolistId, title } = arg;
        return {
          url: `${Paths.todolists}/${todolistId}/${Paths.tasks}`,
          body: { title },
          method: 'POST',
        };
      },
    }),
    deleteTask: builder.mutation<BaseResponse, DeleteTaskArgs>({
      query: (arg) => {
        const { todolistId, taskId } = arg;
        return {
          url: `${Paths.todolists}/${todolistId}/${Paths.tasks}/${taskId}`,
          method: 'DELETE',
        };
      },
    }),
    updateTask: builder.mutation<
      BaseResponse<{ item: Task }>,
      { todolistId: string; taskId: string; model: Partial<UpdateTaskModelType> }
    >({
      query: (arg) => {
        const { taskId, model, todolistId } = arg;
        return {
          url: `${Paths.todolists}/${todolistId}/${Paths.tasks}/${taskId}`,
          method: 'PUT',
          body: model,
        };
      },
    }),
  }),
});

export const { useGetTaskQuery, useAddTaskMutation, useDeleteTaskMutation, useUpdateTaskMutation } = taskApi;

export const taskAPI = {
  // getTasks: (todolistId: string) => {
  //   return instance.get<ResponseTypeGetTask>(`/todo-lists/${todolistId}/tasks`);
  // },
  // addTask: (arg: AddTaskArgs) => {
  //   const { todolistId, title } = arg;
  //   return instance.post<BaseResponse<{ item: Task }>, AxiosResponse<BaseResponse<{ item: Task }>>>(
  //     `/todo-lists/${todolistId}/tasks`,
  //     { todolistId: todolistId, title }
  //   );
  // },
  // deleteTask: (arg: DeleteTaskArgs) => {
  //   const { todolistId, taskId } = arg;
  //   return instance.delete<BaseResponse, AxiosResponse<BaseResponse>>(`/todo-lists/${todolistId}/tasks/${taskId}`);
  // },
  // updateTask: (todoId: string, taskId: string, model: UpdateTaskModelType) => {
  //   return instance.put<BaseResponse<{ item: Task }>, AxiosResponse<BaseResponse<{ item: Task }>>>(
  //     `/todo-lists/${todoId}/tasks/${taskId}`,
  //     { ...model }
  //   );
  // },
};
