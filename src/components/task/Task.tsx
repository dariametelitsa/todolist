import * as React from 'react';
import { getListItemSx } from "../todolist/Todolist.styles";
import styles from "../todolist/Todolist.module.scss";
import Checkbox from "@mui/material/Checkbox";
import { EditableSpan } from "../editableSpan/EditableSpan";
import IconButton from "@mui/material/IconButton";
import DeleteOutlineIcon from "@mui/icons-material/DeleteOutline";
import ListItem from "@mui/material/ListItem";
import { TaskStatuses, TaskType } from "../../api/todolist-api";
import { useTask } from "./hooks/useTask";

type TasksProps = {
    task: TaskType
    todolistId: string
};
export const Task = React.memo(({todolistId, task}: TasksProps) => {
    const {
        removeTaskHandler,
        changeTaskStatusHandler,
        changeTaskTitleHandler
    } = useTask(todolistId);

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