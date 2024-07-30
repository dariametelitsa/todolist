//api
import { instance } from '../../../common/instance/instance';
import { BaseResponse } from '../../../common/types/types';
import { AxiosResponse } from 'axios';
import { TaskStatuses, TodoTaskPriorities } from '../../../common/enums/enums';

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
  getTasks: (todolistId: string) => {
    return instance.get<ResponseTypeGetTask>(`/todo-lists/${todolistId}/tasks`);
  },
  addTask: (arg: AddTaskArgs) => {
    const { todolistId, title } = arg;
    return instance.post<BaseResponse<{ item: TaskType }>, AxiosResponse<BaseResponse<{ item: TaskType }>>>(
      `/todo-lists/${todolistId}/tasks`,
      { todolistId: todolistId, title }
    );
  },
  deleteTask: (arg: DeleteTaskArgs) => {
    const { todolistId, taskId } = arg;
    return instance.delete<BaseResponse, AxiosResponse<BaseResponse>>(`/todo-lists/${todolistId}/tasks/${taskId}`);
  },
  updateTask: (todoId: string, taskId: string, model: UpdateTaskModelType) => {
    return instance.put<BaseResponse<{ item: TaskType }>, AxiosResponse<BaseResponse<{ item: TaskType }>>>(
      `/todo-lists/${todoId}/tasks/${taskId}`,
      { ...model }
    );
  },
};

//types
export type AddTaskArgs = {
  todolistId: string;
  title: string;
};

export type DeleteTaskArgs = {
  todolistId: string;
  taskId: string;
};

export type UpdateTodolistTitle = {
  todolistId: string;
  title: string;
};

export type TodolistType = {
  addedDate: string;
  id: string;
  order: number;
  title: string;
};

export type TaskType = {
  description: string;
  title: string;
  status: TaskStatuses;
  priority: TodoTaskPriorities;
  startDate: string;
  deadline: string;
  id: string;
  todoListId: string;
  order: number;
  addedDate: string;
};
export type UpdateTaskModelType = {
  title: string;
  description: string;
  status: number;
  priority: number;
  startDate: string;
  deadline: string;
  addedDate: string;
};
export type ResponseTypeGetTask = {
  items: TaskType[];
  totalCount: number;
  error: string;
};

export type ErrorResponseType = {
  statusCode: number;
  messages: [
    {
      message: string;
      field: string;
    },
  ];
  error: string;
};
