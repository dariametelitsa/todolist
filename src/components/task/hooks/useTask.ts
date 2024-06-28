import { useAppDispatch } from "../../../model/store";
import { deleteTaskTC, updateTaskTC } from "../../../model/thunk/tasksThunks";
import { TaskStatuses } from "../../../api/todolist-api";

export const useTask = (todolistId: string) => {
    const dispatch = useAppDispatch();

    const removeTaskHandler = (taskId: string) => {
        dispatch(deleteTaskTC(todolistId, taskId))
    };

    const changeTaskStatusHandler = (taskId: string, newState: boolean) => {
        dispatch(updateTaskTC(todolistId, taskId, {status: newState ? TaskStatuses.Completed : TaskStatuses.New}));
    }

    const changeTaskTitleHandler = (taskId: string, newTitle: string) => {
        dispatch(updateTaskTC(todolistId, taskId, {title: newTitle}));
    }

    return {
        removeTaskHandler,
        changeTaskStatusHandler,
        changeTaskTitleHandler
    }
}