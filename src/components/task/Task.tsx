// @flow
import * as React from 'react';
import { TaskType } from "../../data/dataPropsTypes";
import { getListItemSx } from "../todolist/Todolist.styles";
import styles from "../todolist/Todolist.module.scss";
import Checkbox from "@mui/material/Checkbox";
import { EditableSpan } from "../editableSpan/EditableSpan";
import IconButton from "@mui/material/IconButton";
import DeleteOutlineIcon from "@mui/icons-material/DeleteOutline";
import ListItem from "@mui/material/ListItem";
import { useDispatch } from "react-redux";
import { removeTaskAC, renameTaskTitleAC, setNewTaskStatusAC } from "../../model/tasksReduser";

type TasksProps = {
    task: TaskType
    todolistId: string
    // removeTask: (taskId: string) => void
    // changeTaskStatus: (taskId: string, newStatus: boolean) => void
    // changeTaskTitle: (taskId: string, newTitle: string) => void
};
export const Task = React.memo(({todolistId, task}: TasksProps) => {

    const dispatch = useDispatch();

    const removeTaskHandler = (taskId: string) => {
        dispatch(removeTaskAC(todolistId, taskId));
    };

    const changeTaskStatusHandler = (taskId: string, newState: boolean) => {
        dispatch(setNewTaskStatusAC(todolistId, taskId, newState));
    }

    const changeTaskTitleHandler = (taskId: string, newTitle: string) => {
        dispatch(renameTaskTitleAC(todolistId, taskId, newTitle));
    }

    return (
        <ListItem key={task.id}
                  sx={getListItemSx(task.isDone)}>

            <label className={styles.label}>
                <Checkbox checked={task.isDone} onChange={(e) => changeTaskStatusHandler(task.id, e.currentTarget.checked)}/>
                <EditableSpan oldTitle={task.title} idToChange={task.id}
                              updateItem={changeTaskTitleHandler}/>
            </label>
            <IconButton aria-label="delete" onClick={() => removeTaskHandler(task.id)}>
                <DeleteOutlineIcon/>
            </IconButton>
        </ListItem>
    );
});