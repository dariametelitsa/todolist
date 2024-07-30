import { instance } from '../../../common/instance/instance';
import { BaseResponse } from '../../../common/types/types';
import { AxiosResponse } from 'axios';
import { TodolistType, UpdateTodolistTitle } from './todolistAPI.types';

export const todolistAPI = {
  getTodolist: () => {
    return instance.get<Array<TodolistType>>('/todo-lists');
  },
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
