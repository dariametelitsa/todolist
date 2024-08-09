import { instance } from 'common/instance/instance';
import { BaseResponse } from 'common/types';
import { AxiosResponse } from 'axios';
import { AddTaskArgs, DeleteTaskArgs, ResponseTypeGetTask, TaskType, UpdateTaskModelType } from './taskAPI.types';

export const taskAPI = {
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
