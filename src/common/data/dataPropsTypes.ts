import { AppStatusTypes } from 'app/reducers/appSlice';
import { TodolistType } from 'features/todolistList/api/todolistAPI.types';
import { Task } from 'features/todolistList/api/taskAPI.types';

export type FilterValuesType = 'all' | 'completed' | 'active';

export type TodoListDomainType = TodolistType & {
  filter: FilterValuesType;
  entityStatus: AppStatusTypes;
  coverImage?: string;
};

export type TasksType = {
  [key: string]: Task[];
};

export type TasksPropsType = {
  id: string;
  title: string;
  tasks: Array<Task>;
  filter: FilterValuesType;
};

export type TasksArrPropsType = {
  [id: string]: Array<Task>;
};

export type TodolistPropsType = {
  children?: any;
  id: string;
  filter: FilterValuesType;
  changeFilter: (toListId: string, filter: FilterValuesType) => void;
  title: string;
  tasks: Array<Task>;
  coverImage?: string;
  removeTask: (todolistId: string, id: string) => void;
  addTask: (todolistId: string, taskTitle: string) => void;
  deleteAllTasks: (todolistId: string) => void;
  setNewTaskStatus: (todolistId: string, taskId: string, newIsDone: boolean) => void;
  removeTodolist: (todolistId: string) => void;
  renameTaskTitle: (todolistId: string, taskId: string, newTitle: string) => void;
  updateTodolistTitle: (todolistId: string, newTitle: string) => void;
  changeTodoCover: (todolistId: string, coverImage: string) => void;
};

export type CoverImageProps = {
  image?: string;
  updateImage: (coverImage: string) => void;
};

export type todoCoversArr = {
  todolistId: string;
  coverImage: string;
};
