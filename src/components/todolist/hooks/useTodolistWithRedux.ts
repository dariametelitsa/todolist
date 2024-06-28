import { useSelector } from "react-redux";
import { AppRootStateType, useAppDispatch } from "../../../model/store";
import { TaskStatuses, TaskType } from "../../../api/todolist-api";
import { useCallback, useEffect, useMemo } from "react";
import { addTaskTC, cleanTasksListTC, getTasksTC } from "../../../model/thunk/tasksThunks";
import { FilterValuesType } from "../../../data/dataPropsTypes";
import {
    changedTodolistCoverAC,
    changedTodolistFilterAC,
    changeTodolistTitleAC
} from "../../../model/redusers/todolistsReducer";
import { cleanTasksListAC } from "../../../model/redusers/tasksReduser";
import { deleteTodolistTC } from "../../../model/thunk/todolistsThunks";

export const useTodolistWithRedux = (id: string, filter: FilterValuesType) => {
    const tasks = useSelector<AppRootStateType, Array<TaskType>>(state => state.tasks[id]);
    const dispatch = useAppDispatch();

    useEffect(() => {
        dispatch(getTasksTC(id))
    }, [dispatch, id]);

    const filteredTasks = useMemo(() => {
        if (filter === 'active') {
            return tasks.filter((t) => t.status !== TaskStatuses.Completed);
        }
        if (filter === 'completed') {
            return tasks.filter((t) => t.status === TaskStatuses.Completed);
        }
        return tasks;
    }, [tasks, filter]);

    const sorterTasks = useMemo(() => {
        return filteredTasks.sort((prev, next) => {
            if (next.status === TaskStatuses.Completed && prev.status !== TaskStatuses.Completed) return -1;
            if (next.status !== TaskStatuses.Completed && prev.status  === TaskStatuses.Completed) return 1;
            return 0;
        })
    }, [filteredTasks]);

    const onClickFilterHandlerCreator = useCallback((filter: FilterValuesType) => {
        return () => dispatch(changedTodolistFilterAC(id, filter));
    }, [dispatch, id]);

    const onClickHandlerDeleteAllTasks = useCallback(() => {
        dispatch(cleanTasksListTC(id));
    }, [dispatch, id]);

    const addItemHandler = useCallback((title: string) => {
        dispatch(addTaskTC(id, title))
    }, [dispatch, id]);

    const onChangeCoverHandler = useCallback((image: string) => {
        dispatch(changedTodolistCoverAC(id, image));
    },[dispatch, id]);

    const changeTodolistTitleHandler = useCallback((todolistId: string, newTitle: string) => {
        dispatch(changeTodolistTitleAC(todolistId, newTitle));
    },[dispatch]);

    const deleteTodolistHandler = () => {
        dispatch(deleteTodolistTC(id));
    }

    // const onChangeTitleTaskHandler = useCallback((taskId: string, newTitle: string) => {
    //     dispatch(renameTaskTitleAC(id, taskId, newTitle));
    // }, [dispatch, id]);
    //
    // const onChangeSetTaskStatusHandler = useCallback((taskId: string, newStatus: boolean) => {
    //     dispatch(setNewTaskStatusAC(id, taskId, newStatus));
    // }, [dispatch, id]);
    //
    // const deleteTaskHandler = useCallback((taskId: string) => {
    //     dispatch(removeTaskAC(id, taskId));
    // }, [dispatch, id]);

    return {
        dispatch,
        sorterTasks,
        onClickFilterHandlerCreator,
        onClickHandlerDeleteAllTasks,
        addItemHandler,
        onChangeCoverHandler,
        changeTodolistTitleHandler,
        deleteTodolistHandler,
    }
}