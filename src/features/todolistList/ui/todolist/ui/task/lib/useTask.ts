import { TaskStatuses } from 'common/enums/enums';
import { useDeleteTaskMutation, useUpdateTaskMutation } from 'features/todolistList/api/taskAPI';
import { Task as TaskType, UpdateTaskModelType } from 'features/todolistList/api/taskAPI.types';

export const useTask = (todolistId: string, task: TaskType) => {
  const [deleteTask] = useDeleteTaskMutation();
  const [updateTask] = useUpdateTaskMutation();

  const removeTaskHandler = (taskId: string) => {
    deleteTask({ todolistId, taskId });
  };

  const changeTaskStatusHandler = (taskId: string, newState: boolean) => {
    const model = createTaskModel(task, { status: newState ? TaskStatuses.Completed : TaskStatuses.New });
    updateTask({ todolistId, taskId, model });
  };

  const changeTaskTitleHandler = (taskId: string, newTitle: string) => {
    const model = createTaskModel(task, { title: newTitle });
    updateTask({ todolistId, taskId, model });
  };

  return {
    removeTaskHandler,
    changeTaskStatusHandler,
    changeTaskTitleHandler,
  };
};

function createTaskModel(task: TaskType, domainModel: Partial<UpdateTaskModelType>): UpdateTaskModelType {
  return {
    status: task.status,
    title: task.title,
    deadline: task.deadline,
    description: task.description,
    priority: task.priority,
    startDate: task.startDate,
    addedDate: task.addedDate,
    ...domainModel,
  };
}
