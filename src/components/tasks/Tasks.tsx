import React, { useState } from 'react';
import Todolist from "../todolist/Todolist";
import { FilterValuesType, TasksPropsType, TaskType } from "../../data/dataPropsTypes";
import styles from './Tasks.module.scss';

export const Tasks: React.FC<TasksPropsType> = (props: TasksPropsType) => {
    let {title, tasks, students} = props;

    let [tasksFiltered, setTasks] = useState<Array<TaskType>>(tasks);

    let [filter, setFilter] = useState<FilterValuesType>('all')
    function removeTask(id: number) {
        let filteredTasks = tasksFiltered.filter((t) => t.id !== id);
        setTasks(filteredTasks);
    }

    function changeFilter(value: FilterValuesType) {
        setFilter(value);
    }

    let tasksForTodoList = tasksFiltered;

    if (filter === 'completed') {
        tasksForTodoList = tasks.filter(t => t.isDone)
    }

    if (filter === 'active') {
        tasksForTodoList = tasks.filter(t => !t.isDone)
    }


    return (
        <div>
            <Todolist title={title} tasks={tasksForTodoList} removeTask={removeTask} changeFilter={changeFilter} />
            <ul>
                {
                    students.map(s => {
                        return (
                            <li className={styles.listItem} key={crypto.randomUUID()}>{s}</li>
                        )
                    })
                }
            </ul>
        </div>
    );
};
