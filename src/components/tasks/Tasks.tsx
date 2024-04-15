import React, { useState } from 'react';
import Todolist from "../todolist/Todolist";
import { FilterValuesType, TasksPropsType, TaskType } from "../../data/dataPropsTypes";
import { v1 } from "uuid";

export const Tasks: React.FC<TasksPropsType> = (props) => {
    let {title, tasks, id} = props;

    //global state
    let [tasksFiltered, setTasks] = useState<Array<TaskType>>(tasks);

    //local state
    let [filter, setFilter] = useState<FilterValuesType>('all');

    function removeTask(taskId: string) {
        let filteredTasks = tasksFiltered.filter((t) => t.id !== taskId);
        setTasks(filteredTasks);
    }

    const addTask = (taskTitle: string) => {
        let newTask: TaskType = {id: v1(), isDone: false, title: taskTitle};
        taskTitle && setTasks([newTask, ...tasksFiltered]);
    }

    const deleteAllTasks = () => {
        setTasks([]);
    }

    const setNewTaskStatus = (taskId: string, newIsDone: boolean) => {
        // const task = tasksFiltered.find(t => t.id === taskId);
        // if (task) {
        //     task.isDone = newIsDone;
        //     setTasks([...tasksFiltered]);
        // }
        const newState = tasksFiltered.map((t) => t.id === taskId ? {...t, isDone: newIsDone} : t);
        setTasks(newState);
    }

    return (
        <div>
            <Todolist title={title} tasks={tasksFiltered} removeTask={removeTask} id={id}
                      addTask={addTask} deleteAllTasks={deleteAllTasks} setNewTaskStatus={setNewTaskStatus}
                      filter={filter} setFilter={setFilter}>
                {<div>Hey ho! I'm a child</div>}
            </Todolist>
        </div>
    );
};
