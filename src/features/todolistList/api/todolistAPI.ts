import { BaseResponse } from 'common/types';
import { TodolistType, UpdateTodolistTitle } from './todolistAPI.types';
import { TodoListDomain } from 'common/data/dataPropsTypes';
import { baseApi } from 'app/baseApi';
import { Paths } from 'common/Paths';

export const todolistApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getTodolist: builder.query<Array<TodoListDomain>, void>({
      query: () => ({ url: Paths.todolists }),
      transformResponse(todolists: TodolistType[]): TodoListDomain[] {
        return todolists.map((td) => ({ ...td, filter: 'all', entityStatus: 'idle' }));
      },
      providesTags: ['Todolist'],
    }),
    addTodolist: builder.mutation<BaseResponse<{ item: TodolistType }>, string>({
      query: (title) => ({ url: Paths.todolists, method: 'POST', body: { title } }),
      invalidatesTags: ['Todolist'],
    }),
    deleteTodolist: builder.mutation<BaseResponse, string>({
      query: (todoId) => ({ url: `${Paths.todolists}/${todoId}`, method: 'DELETE' }),
      invalidatesTags: ['Todolist'],
    }),
    updateTodolist: builder.mutation<BaseResponse, UpdateTodolistTitle>({
      query: (arg) => {
        const { todolistId, title } = arg;
        return {
          url: `${Paths.todolists}/${todolistId}`,
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
