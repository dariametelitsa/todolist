import React, { useState } from 'react';
import { FilterValuesType, TaskType, todoListType } from "./data/dataPropsTypes";
import { v1 } from "uuid";
import Todolist from "./components/todolist/Todolist";
import { tasksArr, todolistId1, todolistId2, todoListsData } from "./data/Data";
import './App.scss'

export const sum = (a: number, b: number): number => {
    return a + b;
}

function App() {

    //global state
    //const [tasks, setTasks] = useState<Array<TaskType>>(tasksArr[0].taskBlock);
    const [todoLists, setTodoLists] = useState<Array<todoListType>>(todoListsData);
    const [tasks, setTasks] = useState({
        [todolistId1]: [
            {id: v1(), title: "XP", isDone: false},
            {id: v1(), title: "DDD", isDone: true},
            {id: v1(), title: "Scrum", isDone: false}
        ],
        [todolistId2]: [
            {id: v1(), title: "CSS&HTML", isDone: true},
            {id: v1(), title: "JS", isDone: true},
            {id: v1(), title: "React", isDone: false},
            {id: v1(), title: "Redux", isDone: false}
        ]
    });

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

    function removeTask(todolistId: string, taskId: string) {
        setTasks({...tasks, [todolistId]: tasks[todolistId].filter(t => t.id !== taskId)});
    }

    const addTask = (todolistId: string,  taskTitle: string) => {
        let newTask = {id: v1(), isDone: false, title: taskTitle};
        setTasks({...tasks, [todolistId]: [newTask, ...tasks[todolistId]]})
    }

    const deleteAllTasks = (todolistId: string) => {
        setTasks({...tasks, [todolistId]: []});
    }

    const setNewTaskStatus = (todolistId: string, taskId: string, newIsDone: boolean) => {
        setTasks({...tasks, [todolistId]: tasks[todolistId].map((t) => t.id === taskId ? {...t, isDone: newIsDone} : t)});
    }

    return (
        <div className={'App'}>
            {todoLists.map(td => {
                let tasksFiltered = filterTasks(td.id, tasks[td.id], td.filter);
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




