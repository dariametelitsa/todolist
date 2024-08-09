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

export type Task = {
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
  items: Task[];
  totalCount: number;
  error: string;
};
