import React, { useState } from 'react';
import { FilterValuesType, TaskType, todoListType } from "./data/dataPropsTypes";
import { v1 } from "uuid";
import Todolist from "./components/todolist/Todolist";
import { tasksArr, todoListsData } from "./data/Data";
import './App.scss'

export const sum = (a: number, b: number): number => {
    return a + b;
}

function App() {

    //global state
    let [tasks, setTasks] = useState<Array<TaskType>>(tasksArr[0].taskBlock);
    let [todoLists, setTodoLists] = useState<Array<todoListType>>(todoListsData);

    const changeFilter = (todolistId: string, filter: FilterValuesType) => {
        setTodoLists(todoLists.map(td => td.id !== todolistId ? td : {...td, filter}));
    }

    const filterTasks = (todolistId: string, tasks: TaskType[], filter: FilterValuesType) => {
        let tasksFiltered = tasks;
        let todolist = todoLists.find(td => td.id === todolistId);
        if (todolist && todolist.filter === 'active') {
            tasksFiltered = tasks.filter((t) => !t.isDone);
        }
        if (todolist && todolist.filter=== 'completed') {
            tasksFiltered = tasks.filter((t) => t.isDone);
        }
        return tasksFiltered;
    }

    function removeTask(taskId: string) {
        let filteredTasks = tasks.filter((t) => t.id !== taskId);
        setTasks(filteredTasks);
    }

    const addTask = (taskTitle: string) => {
        let newTask: TaskType = {id: v1(), isDone: false, title: taskTitle};
        taskTitle && setTasks([newTask, ...tasks]);
    }

    const deleteAllTasks = () => {
        setTasks([]);
    }

    const setNewTaskStatus = (taskId: string, newIsDone: boolean) => {
        const newState = tasks.map((t) => t.id === taskId ? {...t, isDone: newIsDone} : t);
        setTasks(newState);
    }

    return (
        <div className={'App'}>
            {todoLists.map(td => {
                let tasksFiltered = filterTasks(td.id, tasks, td.filter);
                return <Todolist key={td.id}
                                 id={td.id}
                                 title={td.title}
                                 tasks={tasksFiltered}
                                 removeTask={removeTask}
                                 addTask={addTask}
                                 deleteAllTasks={deleteAllTasks}
                                 setNewTaskStatus={setNewTaskStatus}
                                 filter={td.filter}
                                 changeFilter={changeFilter}>
                    {<div>Just do it!</div>}
                </Todolist>
            })
            }

        </div>
    );
}

export default App;




