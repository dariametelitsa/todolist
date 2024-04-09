import React, { useState } from 'react';
import Todolist from "../todolist/Todolist";
import { TasksPropsType, TaskType } from "../../data/dataPropsTypes";
import { v1 } from "uuid";

export const Tasks: React.FC<TasksPropsType> = (props) => {
    let {title, tasks, id} = props;

    //global state
    let [tasksFiltered, setTasks] = useState<Array<TaskType>>(tasks);

    function removeTask(id: string) {
        let filteredTasks = tasksFiltered.filter((t) => t.id !== id);
        setTasks(filteredTasks);
    }

    const addTask = (taskTitle: string) => {
        let newTask: TaskType = {id: v1(), isDone: false, title: taskTitle};
        taskTitle && setTasks([newTask, ...tasksFiltered]);
    }

    return (
        <div>
            <Todolist title={title} tasks={tasksFiltered} removeTask={removeTask} id={id}
                      addTask={addTask}/>
        </div>
    );
};
