// @flow
import * as React from 'react';
import { getListItemSx } from "../todolist/Todolist.styles";
import styles from "../todolist/Todolist.module.scss";
import Checkbox from "@mui/material/Checkbox";
import { EditableSpan } from "../editableSpan/EditableSpan";
import IconButton from "@mui/material/IconButton";
import DeleteOutlineIcon from "@mui/icons-material/DeleteOutline";
import ListItem from "@mui/material/ListItem";
import { TaskStatuses, TaskType } from "../../api/todolist-api";
import { useAppDispatch } from "../../model/store";
import { deleteTaskTC, updateTaskTC } from "../../model/thunk/tasksThunks";

type TasksProps = {
    task: TaskType
    todolistId: string
    // removeTask: (taskId: string) => void
    // changeTaskStatus: (taskId: string, newStatus: boolean) => void
    // changeTaskTitle: (taskId: string, newTitle: string) => void
};
export const Task = React.memo(({todolistId, task}: TasksProps) => {

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

    return (
        <ListItem key={task.id}
                  sx={getListItemSx(task.status === TaskStatuses.Completed)}>

            <label className={styles.label}>
                <Checkbox checked={task.status === TaskStatuses.Completed} onChange={(e) => changeTaskStatusHandler(task.id, e.currentTarget.checked)}/>
                <EditableSpan oldTitle={task.title} idToChange={task.id}
                              updateItem={changeTaskTitleHandler}/>
            </label>
            <IconButton aria-label="delete" onClick={() => removeTaskHandler(task.id)}>
                <DeleteOutlineIcon/>
            </IconButton>
        </ListItem>
    );
});