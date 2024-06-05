// import React, { useState } from 'react';
// import Todolist from "../todolist/Todolist";
// import { TasksPropsType, TaskType } from "../../data/dataPropsTypes";
// import { v1 } from "uuid";
//
// export const TasksGroups: React.FC<TasksPropsType> = (props) => {
//     let {title, tasks, id} = props;
//
//     //global state
//     let [tasksFiltered, setTasks] = useState<Array<TaskType>>(tasks);
//
//     function removeTask(taskId: string) {
//         let filteredTasks = tasksFiltered.filter((t) => t.id !== taskId);
//         setTasks(filteredTasks);
//     }
//
//     const addTask = (taskTitle: string) => {
//         let newTask: TaskType = {id: v1(), isDone: false, title: taskTitle};
//         taskTitle && setTasks([newTask, ...tasksFiltered]);
//     }
//
//     const deleteAllTasks = () => {
//         setTasks([]);
//     }
//
//     const setNewTaskStatus = (taskId: string, newIsDone: boolean) => {
//         // const task = tasksFiltered.find(t => t.id === taskId);
//         // if (task) {
//         //     task.isDone = newIsDone;
//         //     setTasks([...tasksFiltered]);
//         // }
//         const newState = tasksFiltered.map((t) => t.id === taskId ? {...t, isDone: newIsDone} : t);
//         setTasks(newState);
//     }
//
//     return (
//         <div>
//             <Todolist title={title} tasks={tasksFiltered} removeTask={removeTask} id={id}
//                       addTask={addTask} deleteAllTasks={deleteAllTasks} setNewTaskStatus={setNewTaskStatus}
//                       filter={props.filter} setFilter={setFilter}>
//                 {<div>Hey ho! I'm a child</div>}
//             </Todolist>
//         </div>
//     );
// };

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

type TasksProps = {
    task: TaskType
    todolistId: string
    removeTask: (taskId: string) => void
    changeTaskStatus: (taskId: string, newStatus: boolean) => void
    changeTaskTitle: (taskId: string, newTitle: string) => void
};
export const Tasks = React.memo(({task, todolistId, removeTask, changeTaskStatus, changeTaskTitle}: TasksProps) => {


    return (
        <ListItem key={task.id}
                  sx={getListItemSx(task.isDone)}>


            <label className={styles.label}>
                <Checkbox checked={task.isDone} onChange={(e) => changeTaskStatus(task.id, e.currentTarget.checked)}/>
                <EditableSpan oldTitle={task.title} idToChange={task.id}
                              updateItem={changeTaskTitle}/>
            </label>
            <IconButton aria-label="delete" onClick={() => removeTask(task.id)}>
                <DeleteOutlineIcon/>
            </IconButton>
        </ListItem>
    );
});