import React, { useState } from 'react';
import Todolist from "../todolist/Todolist";
import { FilterValuesType, TasksPropsType, TaskType } from "../../data/dataPropsTypes";

export const Tasks: React.FC<TasksPropsType> = (props) => {
    let {title, tasks, id} = props;

    let [tasksFiltered, setTasks] = useState<Array<TaskType>>(tasks);

    let [filter, setFilter] = useState<FilterValuesType>('all')

    function removeTask(id: number) {
        let filteredTasks = tasksFiltered.filter((t) => t.id !== id);
        setTasks(filteredTasks);
    }

    function changeFilter(value: FilterValuesType) {
        setFilter(value);
    }

    const getTasksFotTodolist = (tasks: Array<TaskType>, filter: FilterValuesType) => {
        switch (filter) {
            case 'active':
                return tasks.filter(t => !t.isDone);

            case 'completed':
                return tasks.filter(t => t.isDone);

            default:
                return tasks;
        }
    }
    const tasksForTodoList = getTasksFotTodolist(tasksFiltered, filter);


    const addTask = (id: number, taskTitle: string) => {
        let newTask = {id: tasksFiltered.length + 1, isDone: false, title: taskTitle};
        taskTitle && setTasks([newTask, ...tasksFiltered]);
    }

    return (
        <div>
            <Todolist title={title} tasks={tasksForTodoList} removeTask={removeTask} changeFilter={changeFilter} id={id}
                      addTask={addTask}/>
        </div>
    );
};
