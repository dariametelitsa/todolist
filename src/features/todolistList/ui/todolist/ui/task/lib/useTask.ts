import { TaskStatuses } from 'common/enums/enums';
import { useDeleteTaskMutation, useUpdateTaskMutation } from 'features/todolistList/api/taskAPI';

export const useTask = (todolistId: string) => {
  const [deleteTask] = useDeleteTaskMutation();
  const [updateTask] = useUpdateTaskMutation();

  const removeTaskHandler = (taskId: string) => {
    deleteTask({ todolistId, taskId });
  };

  const changeTaskStatusHandler = (taskId: string, newState: boolean) => {
    updateTask({ todolistId, taskId, model: { status: newState ? TaskStatuses.Completed : TaskStatuses.New } });
  };

  const changeTaskTitleHandler = (taskId: string, newTitle: string) => {
    updateTask({ todolistId, taskId, model: { title: newTitle } });
  };

  return {
    removeTaskHandler,
    changeTaskStatusHandler,
    changeTaskTitleHandler,
  };
};
