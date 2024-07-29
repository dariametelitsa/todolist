import { useAppDispatch } from '../../../../../app/store';
import { TaskStatuses } from '../../../../../api/todolist-api';
import { deleteTask, updateTask } from '../../../redusers/tasksSlice';

export const useTask = (todolistId: string) => {
  const dispatch = useAppDispatch();

  const removeTaskHandler = (taskId: string) => {
    dispatch(deleteTask({ todolistId, taskId }));
  };

  const changeTaskStatusHandler = (taskId: string, newState: boolean) => {
    dispatch(
      updateTask({ todolistId, taskId, model: { status: newState ? TaskStatuses.Completed : TaskStatuses.New } })
    );
  };

  const changeTaskTitleHandler = (taskId: string, newTitle: string) => {
    dispatch(updateTask({ todolistId, taskId, model: { title: newTitle } }));
  };

  return {
    removeTaskHandler,
    changeTaskStatusHandler,
    changeTaskTitleHandler,
  };
};
