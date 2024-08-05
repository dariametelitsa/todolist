//types
import { TaskStatuses, TodoTaskPriorities } from 'common/enums';

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
